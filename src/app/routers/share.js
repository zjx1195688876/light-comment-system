const router = require('koa-router')();
const Share = require('../controllers/share');

const routers = router
    .post('/create.json', Share.create)
    .get('/list.json', Share.list)
    .get('/search.json', Share.search);

module.exports = routers;