const User = require('../models/user');
const commonReturn = require('../utils');
const uuidv3 = require('uuid/v3');

const opts = {  // 返回给前台的结果中不包含数据库特有的_id和__v
    '_id': 0,
    '__v': 0
};

const setSession = (ctx, res) => {
    //保存登录状态
    ctx.session.userId = res.userId || '';
    ctx.session.userName = res.userName || '';
};

const clearSession = (ctx) => {
    ctx.session = null;
};

// const setClientCookie = (ctx, res) => {
//     ctx.cookies.set('userName', new Buffer(res.userName).toString('base64'), {
//         overwrite: false,
//         httpOnly: false
//     });
// };

module.exports = {
    async login (ctx) {
        const { userName = '', password = '' } = ctx.request.body;
        let condition = {'userName': userName};
        await User.findOne(condition, opts).then(res => {
            if (res && password === res.password) {
                setSession(ctx, res);
                // setClientCookie(ctx, res);
                ctx.body = {
                    code: 200,
                    success: true,
                    message: '登录成功'
                };
            } else {
                ctx.body = {
                    code: -1,
                    success: false,
                    message: '用户名或密码错误'
                };
            }
        }, err => {
            ctx.body = {
                code: -1,
                success: false,
                message: err || '登录失败'
            };
        });
    },
    async logout (ctx) {
        await clearSession(ctx);
        ctx.body = {
            code: 200,
            success: true,
            message: '退出成功'
        };
    },
    async register (ctx) {
        const { userName = '', password = '' } = ctx.request.body;
        const userId = uuidv3(userName, uuidv3.DNS);
        let user = {
            userId,
            userName,
            password,
            date: new Date()
        };
        delete user._id;
        // new: true 显示新建的collection的内容，即res
        let cb = User.findOneAndUpdate(
            {'userId': userId},
            user,
            {upsert: true, new: true, setDefaultsOnInsert: true}
        );
        await commonReturn(cb, ctx);
    },
    // 要不要用async/await呢？
    async getUser (ctx) {
        console.log('ctx.session: ', ctx.session);
        ctx.body = {
            code: 200,
            data: {
                userId: ctx.session.userId || '',
                userName: ctx.session.userName || ''
            },
            success: true,
            message: '获取成功'
        };
    }
};