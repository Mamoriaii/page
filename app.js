const Koa = require('koa');
const jwt = require('koa-jwt');
const cors = require('koa2-cors');
const proxy = require('koa-server-http-proxy')

let index = require('./routes/index');
let users = require('./routes/users');
let pres = require('./routes/prefixs.cjs');
let jump = require('./routes/jump.js');
let jp = require('./routes/jp');

//全局配置
global.secret = "tokensecret";
const app = new Koa();

// app.use(
//   cors({
//     origin: function (ctx) { //设置允许来自指定域名请求
//       return '*'; // 允许来自所有域名请求
//     },
//     maxAge: 5, //指定本次预检请求的有效期，单位为秒。
//     credentials: true, //是否允许发送Cookie
//     allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
//     allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
//     exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
//   })
// );

app.use(cors());

app.use(proxy('/nlp', {
    target: 'https://www.atilika.org/kuromoji/rest/tokenizer/',
    pathRewrite: { '^/nlp': '' },
    changeOrigin: true
}))


app.use(proxy('/zdgram', {
    target: 'http://grammar.izaodao.com/',
    pathRewrite: { '^/zdgram': '' },
    changeOrigin: true,
}));

app.use(proxy('/tlrc', {
    target: 'https://lyrics-bar.tw/',
    pathRewrite: { '^/tlrc': '' },
    changeOrigin: true,
}));
app.use(proxy('/ulrc', {
    target: 'https://utaten.com/',
    pathRewrite: { '^/ulrc': '' },
    changeOrigin: true
}))
app.use(proxy('/xlrc', {
    target: 'https://www.lyrical-nonsense.com/lyrics/hey-say-jump/',
    pathRewrite: { '^/xlrc': '' },
    changeOrigin: true,
}));
app.use(proxy('/jns', {
    target: 'https://www.johnnys-net.jp/',
    pathRewrite: { '^/jns': '' },
    changeOrigin: true,
}));
app.use(async (ctx, next) => {
    try {
        ctx.error = (code, message) => {
            console.log(code);
            if (typeof code === 'string') {
                message = code;
                code = 500;
            }
            ctx.throw(code || 500, message || '服务器错误');
        };
        await next();
    } catch (e) {
        let status = e.status || 500;
        let message = e.message || '服务器错误';
        ctx.response.body = { code: -1, msg: message };
        ctx.response.status = status;
    }
});

app.use(require('koa-bodyparser')());

const static = require('koa-static');
const path = require('path')

// app.use(
//   jwt({
//     secret: global.secret
//   }).unless({
//     path: [/^\/login/, /^\/register/]
//   })
// )


// routes definition
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(pres.routes(), pres.allowedMethods());
app.use(jump.routes(), jump.allowedMethods());
app.use(jp.routes(), jump.allowedMethods());
app.use(static(
    path.join(__dirname, './webs')
))
app.listen(3000);
console.log('server is running at http://localhost:3000')
module.exports = app