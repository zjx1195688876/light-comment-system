const Share = require('../models/share');
const commonReturn = require('../utils');
const uuidv3 = require('uuid/v3');

const opts = {  // 返回给前台的结果中不包含数据库特有的_id和__v
    '_id': 0,
    '__v': 0
};

module.exports = {
    async create (ctx) {
        // console.log('ctx: ', ctx);
        const { title = '', desc = '', lineDate = '' } = ctx.request.body;
        const userId = ctx.session.userId || '';
        const key = `${userId},${title},${desc}`;
        const shareId = uuidv3(key, uuidv3.DNS);
        let share = {
            userId,
            shareId,
            title,
            desc,
            lineDate,
            date: new Date()
        };
        delete share._id;
        // new: true 显示新建的collection的内容，即res
        let cb = Share.findOneAndUpdate(
            {'shareId': shareId},
            share,
            {upsert: true, new: true, setDefaultsOnInsert: true}
        );
        await commonReturn(cb, ctx);
    },
    async list (ctx) {
        const userId = ctx.session.userId || '';
        const sort = {'date': -1};        // 排序（按时间倒序）
        const skipnum = 0;   // 跳过数
        let cb;
        let option = { userId };
        cb = Share.find(option, opts).skip(skipnum).sort(sort).exec();
        await commonReturn(cb, ctx);
    },
    async search (ctx) {
        const { userId, shareId } = ctx.query;
        let conditon = {'userId': userId, 'shareId': shareId};
        let cb = Share.findOne(conditon, opts);
        await commonReturn(cb, ctx);
    }
};