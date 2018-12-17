const router = require('koa-router')();
const Detail = require('../controllers/detail');

const routers = router
    .post('/create.json', Detail.create)
    .get('/list.json', Detail.list);

module.exports = routers;