const mongoose = require('mongoose');

const DB_PATH = 'mongodb://localhost:27017/light-comment-system';
const DB_OPTIONS = { promiseLibrary: global.Promise };
// mpromise (mongoose's default promise library) is deprecated, plug in own promise library
mongoose.Promise = global.Promise;
// 连接mongodb
mongoose.connect(DB_PATH, DB_OPTIONS);
// 数据库连接成功
mongoose.connection.on('connected', () => {
    console.log('数据库连接成功：' + DB_PATH);
});
// 数据库连接异常
mongoose.connection.on('error', (err) => {
    console.log('数据库连接异常：' + err);
});
// 数据库断开连接
mongoose.connection.on('disconnected', () => {
    console.log('数据库断开连接');
});

module.exports = mongoose;
