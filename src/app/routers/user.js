const router = require('koa-router')();
const User = require('../controllers/user');

const routers = router
    .post('/login.json', User.login)
    .post('/logout.json', User.logout)
    .post('/register.json', User.register)
    .get('/getUser.json', User.getUser)
    .get('/search.json', User.search);

module.exports = routers;