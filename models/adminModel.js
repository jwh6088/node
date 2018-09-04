// 引入数据库配置模块
var mongoose = require('../configs/db_config.js');

// 定义 user 数据的 骨架(用来约束 itmes 这个集合的)
var adminSchema = new mongoose.Schema({
    // 账号
    username: String,
    // 密码
    password: String,
    // 电话
    tel: String,
    // 创建时间
    ctime: {
        type: Date,
        default: new Date()   // 默认值
    },
})

// 3.创建数据库模型      (在数据库里创建集合的时候 会自动帮你变成 复数)
var adminModel = mongoose.model('admin', adminSchema);

// 暴露数据库模型
module.exports = adminModel;