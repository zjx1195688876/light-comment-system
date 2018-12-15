const mongoose = require('./mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    userId: String,
    userName: String,
    password: String,
    date: { type: Date, default: Date.now }
});

// 根据定义的blog schema 生成modal
let userModel = mongoose.model('User', userSchema);

module.exports = userModel;
