// 引入数据库配置模块
var mongoose = require('../configs/db_config.js');

// 定义 link 数据的 骨架
var linkSchema = new mongoose.Schema({
    // 栏目名称
    name: String,
    // url
    url:String,   
})

// 3.创建数据库模型      (在数据库里创建集合的时候 会自动帮你变成 复数)
var linkModel = mongoose.model('link', linkSchema);

// 暴露数据库模型
module.exports = linkModel;