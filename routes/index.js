const Router = require('koa-router');

const router = new Router();
const addtoken = require('../utils/addToken');
const userDB = [
    {
        id: '001',
        username: 'admin',
        password: '123456'
    },
    {
        id: '002',
        username: 'test',
        password: '123456'
    }
]
router.post('/login', function (ctx, next) {
    let username = ctx.request.body.username;
    let pass = ctx.request.body.password;
    let user = userDB.find(item => {
        return item.username === username && pass === item.password
    });
    if (user) {
        ctx.body = {
            code: 0,
            data: {
                user: { id: user.id, username: user.username },
                token: addtoken(user)
            },
            msg: 'success'
        };
    } else {
        ctx.body = {
            code: -1,
            msg: "未找到该用户"
        };
    }
})

module.exports = router;
