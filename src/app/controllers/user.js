const User = require('../models/user');
const commonReturn = require('../utils');
const uuidv3 = require('uuid/v3');

module.exports = {
    async login (ctx) {
        const { userName = '', password = '' } = ctx.request.body;
        let condition = {'userName': userName};
        await Login.findOne(condition, opts).then(res => {
            if (password === res.password) {
                setCookie(ctx, res);
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
    }
};