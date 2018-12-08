const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const path = require('path');
// const createApp = require('./src/app');

// 待处理
const createApp = require('/path/to/built-server-bundle.js')

const ROOT_PATH = path.resolve(__dirname, './src');
const template =  fs.readFileSync(path.join(ROOT_PATH, '/template/index.html'), 'utf-8');

const renderer = require('vue-server-renderer').createRenderer({
    template
});

app.use(async ctx => {
    const context = {
        title: 'this is title',
    };
    const data = {
        content: 'hello world'
    };

    createApp(data).then(app => {
        renderer.renderToString(app, context, (err, html) => {
            ctx.body = html;
        })
    });
});

app.listen(3000);
