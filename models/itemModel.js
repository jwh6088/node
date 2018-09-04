// 引入数据库配置模块
var mongoose = require('../configs/db_config.js');

// 定义 user 数据的 骨架(用来约束 itmes 这个集合的)
var itemSchema = new mongoose.Schema({
    // 栏目名称
    name: String,
    // 创建时间
    ctime: {
        type:Date,
        default:  new Date()   // 默认值
    },      
    // 栏目排序
    order:Number,
    // 栏目描述
    description: String      
})

// 3.创建数据库模型      (在数据库里创建集合的时候 会自动帮你变成 复数)
var itemModel = mongoose.model('item', itemSchema);

// 暴露数据库模型
module.exports = itemModel;