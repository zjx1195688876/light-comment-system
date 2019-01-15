const Koa = require('koa');
const koaRouter = require('koa-router');
const app = new Koa();
const fs = require('fs');
const path = require('path');
const { createBundleRenderer } = require('vue-server-renderer');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const session=require('koa-session')
const LRU = require('lru-cache')
const ApiRouter = require('./src/app/routers/index'); // ajax的路由
const pageRouter = koaRouter();

app.keys = ['this is session key'];

// 使用koa-session存储用户信息
// 此时，为了在导航守卫能获取到用户登录的cookie信息，做路由重定向，现在只能httpOnly: false
app.use(session({
    key: 'user', /** cookie的名称 */
    maxAge: 1000 * 60 * 60 * 24 * 10, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示10天 */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: false, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
},app));
// 解析静态资源
app.use(serve(
    path.join(__dirname, './dist')
));
// 使用ctx.body解析中间件, 这样才能通过ctx.request.body拿到post请求的入参
app.use(bodyParser());

const isProd = process.env.NODE_ENV === 'production';

const resolve = file => path.resolve(__dirname, file);

const createRenderer = (bundle, options) => {
    return createBundleRenderer(bundle, Object.assign({}, options, {
        runInNewContext: false
    }));
};

const renderData = (ctx, renderer) => {
    const context = {
        url: ctx.url,
        session: ctx.session || {},
        cookie: ctx.request.header.cookie || ''
    };
    return new Promise( (resolve, reject) => {
        renderer.renderToString(context, (err, html) => {
            if (err) {
                return reject(err);
            }
            resolve(html);
        });
    })
}

let renderer;
if (isProd) {
    // 生产环境直接获取
    const bundle = require('./dist/vue-ssr-server-bundle.json');
    const template = fs.readFileSync(resolve('./src/template/index.html'), 'utf-8');
    const clientManifest = require('./dist/vue-ssr-client-manifest.json');
    renderer = createRenderer(bundle, {
        template,
        clientManifest,
        cache: LRU({
            max: 1000,
            maxAge: 1000 * 60 * 15
        })
    });

} else { // 开发环境
    require('./build/setup-dev-server.js')(app, (bundle, options) => {
        console.log('bundle callback..');
        renderer = createRenderer(bundle, Object.assign({}, options, {
            cache: LRU({
                max: 1000,
                maxAge: 1000 * 60 * 15
            })
        }));
        console.log(renderer);
    });
}


pageRouter.get('*', async (ctx, next) => {
    // 提示webpack还在工作
    if (!renderer) {
        ctx.type = 'html';
        return ctx.body = 'waiting for compilation... refresh in a moment.';
    }
    const s = Date.now();
    let html,
        status;
    try {
        status = 200;
        html = await renderData(ctx, renderer);
    } catch (e) {
        if (e.code === 404) {
            status = 404;
            html = '404 | Not Found';
        } else {
            status = 500;
            html = '500 | Internal Server Error';
            console.error(`error during render : ${ctx.url}`);
        }
    }
    ctx.type = 'html';
    ctx.status = status ? status : ctx.status;
    ctx.body = html;
    if (!isProd) {
        console.log(`whole request: ${Date.now() - s}ms`)
    }
})

app.use(ApiRouter.routes()).use(ApiRouter.allowedMethods());
app.use(pageRouter.routes()).use(pageRouter.allowedMethods());

app.listen(3000);
