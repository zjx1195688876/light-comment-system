const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const path = require('path');
const createApp = require('./src/app');

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
    const app = createApp(data);

    renderer.renderToString(app, context, (err, html) => {
        ctx.body = html;
    })
});

app.listen(3000);
