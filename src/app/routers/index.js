const router = require('koa-router')();
const user = require('./user');
const share = require('./share');
const detail = require('./detail');

router.use('/user', user.routes(), user.allowedMethods());
router.use('/share', share.routes(), share.allowedMethods());
router.use('/detail', detail.routes(), detail.allowedMethods());

module.exports = router;
