const router = require('koa-router')();
const user = require('./user');
const share = require('./share');

router.use('/user', user.routes(), user.allowedMethods());
router.use('/share', share.routes(), share.allowedMethods());

module.exports = router;
