const mongoose = require('./mongoose');
const Schema = mongoose.Schema;

let shareSchema = new Schema({
    userId: String,
    shareId: String,
    title: String,
    desc: String,
    lineDate: Date,
    date: { type: Date, default: Date.now }
});

// 根据定义的blog schema 生成modal
let shareModel = mongoose.model('Share', shareSchema);

module.exports = shareModel;
