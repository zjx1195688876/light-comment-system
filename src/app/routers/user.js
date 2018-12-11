const router = require('koa-router')();
const User = require('../controllers/user');

const routers = router
    .post('/login.json', User.login)
    .post('/register.json', User.register);

module.exports = routers;