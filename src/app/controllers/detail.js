const Detail = require('../models/detail');
const commonReturn = require('../utils');

const opts = {  // 返回给前台的结果中不包含数据库特有的_id和__v
    '_id': 0,
    '__v': 0
};

module.exports = {
    async create (ctx) {
        const {
            comment1,
            comment2,
            comment3,
            comment4,
            comment5,
            advantage,
            improvement,
            comment8,
            userId,
            shareId
        } = ctx.request.body;

        let detail = new Detail({
            comment1,
            comment2,
            comment3,
            comment4,
            comment5,
            advantage,
            improvement,
            comment8,
            userId,
            shareId,
            date: new Date()
        });

        let cb = detail.save();
        await commonReturn(cb, ctx);
    },
    async list (ctx) {
        const userId = ctx.session.userId || '';
        const { shareId } = ctx.query;
        const sort = {'date': -1};        // 排序（按时间倒序）
        const skipnum = 0;   // 跳过数
        let cb;
        let option = { userId, shareId };
        cb = Detail.find(option, opts).skip(skipnum).sort(sort).exec();
        await commonReturn(cb, ctx);
    },
};