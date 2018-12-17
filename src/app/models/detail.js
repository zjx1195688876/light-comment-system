const mongoose = require('./mongoose');
const Schema = mongoose.Schema;

let detailSchema = new Schema({
    comment1: Number,
    comment2: Number,
    comment3: Number,
    comment4: Number,
    comment5: Number,
    advantage: String,
    improvement: String,
    comment8: Number,
    userId: String,
    shareId: String,
    date: { type: Date, default: Date.now }
});

// 根据定义的blog schema 生成modal
let detailModel = mongoose.model('Detail', detailSchema);

module.exports = detailModel;
