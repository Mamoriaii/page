const Router = require('koa-router');

const router = new Router();
router.prefix('/users');
const randomString = (e) => {
    e = e || 32;
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
        a = t.length,
        n = "";
    for (let i = 0; i < e; i++) {
        n += t.charAt(Math.floor(Math.random() * a));
    }
    return n
}
router.get('/list', function (ctx, next) {
    ctx.body = {
        code: 0,
        data: Array.from({ length: 3 }).map((i, idx) => ({ value: idx, label: randomString(10) }))
    };
    next();
})

module.exports = router;
