const jwt = require('jsonwebtoken');
module.exports = (userinfo) => { //创建token并导出
    const token = jwt.sign({
        user: userinfo.username,
        id: userinfo.id
    }, global.secret, { expiresIn: '1h' });
    return token;
};

