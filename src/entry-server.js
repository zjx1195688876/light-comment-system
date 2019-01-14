// 仅运行于服务器
// 服务器 entry 使用 default export 导出函数，并在每次渲染中重复调用此函数
// 此文件负责：1. 服务器端路由匹配(server-side route matching); 2. 数据预取逻辑(data pre-fetching logic)。
import { createApp } from './app';
import { createStore } from './store';

const get  = (url = '', key = '') => {
    if (url && key && url.indexOf('?') > -1) {
        const obj = {};
        const search = url.split('?')[1];
        const arr = search.split('&');
        arr.forEach(item => {
            const key = item.split('=')[0];
            const value = item.split('=')[1];
            obj[key] = value;
        });

        return obj[key] || '';
    }
    return '';
}

export default context => {
    // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
    // 以便服务器能够等待所有的内容在渲染前，
    // 就已经准备就绪。
    return new Promise((resolve, reject) => {
        const store = createStore();
        const { app, router } = createApp(store);
        const url = context.url || '/';
        // const { app, router, store } = createApp();
        // let url = '/login';
        // if (context.url.indexOf('comment') > 0 || context.session.userName) { // 不需要登录信息 || 登录情况下
        //     url = context.url;
        // }

        // console.log('url: ', url);

        // 设置服务器端 router 的位置
        router.push(url);

        // 等到 router 将可能的异步组件和钩子函数解析完
        // entry-server.js router先执行
        router.onReady(() => {

            const matchedComponents = router.getMatchedComponents();
            // 匹配不到的路由，执行 reject 函数，并返回 404
            if (!matchedComponents.length) {
                return reject({ code: 404 });
            }
            // 对所有匹配的路由组件调用 `asyncData()`
            Promise.all(matchedComponents.map(Component => {
                if (Component.asyncData) {
                    let config = {
                        cookie: context.cookie
                    };
                    if (Component.name === 'shareItem') {
                        config = Object.assign({}, config, {
                            shareId: get(url, 'shareId')
                        });
                    }
                    if (Component.name === 'comment') {
                        config = Object.assign({}, config, {
                            userId: get(url, 'userId'),
                            shareId: get(url, 'shareId')
                        });
                    }
                    return Component.asyncData({
                        store,
                        route: router.currentRoute,
                        config
                    });
                }
            }))
            .then(() => {
                // 在所有预取钩子(preFetch hook) resolve 后，
                // 我们的 store 现在已经填充入渲染应用程序所需的状态。
                // 当我们将状态附加到上下文，
                // 并且 `template` 选项用于 renderer 时，
                // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
                
                context.state = store.state;

                resolve(app);
            })
            .catch(reject)
        }, reject)
    })
};
