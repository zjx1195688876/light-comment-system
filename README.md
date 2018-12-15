# light-comment-system
a light comment system by ssr

# 需要做的点
1. 组件级别cache
2. 降级为前端渲染的方案
3. elementUI的组件可以按需引入
4. 注册增加查找逻辑，数据找得到直接提示去登录，在前端判断，先查找userName再注册user
5. 【重要】登录逻辑还未完成（包括cookie）

# 可能遇到的踩坑
1. 一个页面多次访问之后，state一直增加导致内存泄漏，这个时候只需每个路由建一个 key 即可，例详情页只建立一个 detail 的 key，请求的数据赋值给 detail 即可 [https://segmentfault.com/a/1190000015440082]

2. 为什么不能用router.push({ path: '/'});来跳转？

# 踩坑
1. // 使用ctx.body解析中间件, 这样才能通过ctx.request.body拿到post请求的入参
   const bodyParser = require('koa-bodyparser');
   app.use(bodyParser());

2. API的router要放在pageRouter前面，不然SSR的ajax请求会先走进pageRouter里面
   app.use(ApiRouter.routes()).use(ApiRouter.allowedMethods());
   app.use(pageRouter.routes()).use(pageRouter.allowedMethods());