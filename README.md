# light-comment-system
a light comment system by ssr

# 开发准备
1. 安装Node
2. 安装npm
3. 安装mongoDB，创建数据库名为: light-comment-system, 端口号: 27017

# 启动应用
```
1. 本地开发
    git clone git@github.com:zjx1195688876/light-comment-system.git

    npm i

    启动数据库

    npm run dev 启动应用

    访问http://127.0.0.1:3000
```

# 参考资料
1. 降级处理：https://juejin.im/post/5b8e64c5f265da43481607a1
2. egg ssr：https://www.yuque.com/easy-team/egg-vue/node

# 需要做的点
1. 组件级别cache【完成】
2. 降级为前端渲染的方案
3. elementUI的组件可以按需引入
4. 注册增加查找逻辑，数据找得到直接提示去登录，在前端判断，先查找userName再注册user【完成】
5. 【重要】登录逻辑还未完成（包括cookie）【完成】

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

3. 服务端axios的cookie传递： [参考资料：https://segmentfault.com/a/1190000010225972]
   1. 修改server.js:
   ```javascript
    const context = {
        url: ctx.url,
        session: ctx.session || {},
        cookie: ctx.request.header.cookie || ''
    };
   ```
   2. 修改entry-server.js
   ```javascript
    return Component.asyncData({
        store,
        route: router.currentRoute,
        cookie: context.cookie,
    });
   ```
   3. 修改具体的页面组件：
   ```javascript
    asyncData ({ store, route, cookie}) {
        store.registerModule('list', shareListStoreModule)
        return store.dispatch('list/getPageData', { cookie })
    },
   ```
   4. 修改store:
   ```javascript
   actions: {
        // getPageData: ({ commit }) => commit('GET_PAGE_DATA', pageData)
        getPageData ({ commit }, config = {}) {
            axios({
                method: 'GET',
                url: `${origin}/share/list.json`,
                timeout: 5000,
                headers: {
                    cookie: config.cookie || 'mock cookie'
                }
            })
            .then(res => {
                console.log(res);
            });
        }
    },
   ```


> cd /usr/local
> export PATH=/usr/local/mongodb/bin:$PATH
> mongod