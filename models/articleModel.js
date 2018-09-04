// 引入数据库配置模块
var mongoose = require('../configs/db_config.js');

// 定义 user 数据的 骨架(用来约束集合的)
var articleSchema = new mongoose.Schema({
    // 关联栏目
    itemId:{
        type:'ObjectId',
        // 关联集合
        ref:'item',
    },
    // 文章标题
    title: String,
    // 作者
    author:String,
    // 关键字
    keywords:String,
    // 描述
    description:String,
    // 封面
    imgurl:String,
    // 内容
    content:String,
    // 创建时间
    ctime: {
        type:Date,
        default:  new Date()   // 默认值
    },         
})

// 3.创建数据库模型      (在数据库里创建集合的时候 会自动帮你变成 复数)
var articleModel = mongoose.model('article', articleSchema);

// 暴露数据库模型
module.exports = articleModel;