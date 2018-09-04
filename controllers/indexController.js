// 声明一个 前台的控制器 模块
var indexController = {};

// 引入 数据库模型 模块
var itemModel = require('../models/itemModel');
var articleModel = require('../models/articleModel');
var linkModel = require('../models/linkModel')

// 首页
indexController.index = function(req,res,next){
    // 获取栏目列表
    itemModel.find().sort({order:1}).exec(function(err,data){
        if(err){
            console.log('添加数据失败');
        }else{
            getArticleDataList(0)
            // 递归
            function getArticleDataList(i){
                articleModel.find({itemId:data[i]._id}).limit(10).exec(function(error,data1){
                    data[i].articleList = data1;
                    if(i<data.length-1){
                        // 没有查完继续查询
                        getArticleDataList(++i);
                    }else{
                        linkModel.find().exec(function(error,data2){
                            // 查完分配数据
                            res.render('index', { itemlist: data,linklist:data2 });
                        })
                    }
                })
            }

        }
    })
}

// 列表页
indexController.list = function(req,res,next){
    //获取栏目列表
    itemModel.find().sort({order:1}).exec(function(err,data){
        // 查找一个栏目
        itemModel.find({_id:req.params._id},function(err,data3){
            if(err){
                console.log('添加数据失败');
            }else{
                // 获取当前栏目的文章
                articleModel.find({itemId:data3[0]._id}).exec(function(error,data1){
                    data3[0].articleList = data1;
                    // 获取友链
                    linkModel.find().exec(function(error,data2){
                        // 查完分配数据
                        res.render('list', {itemlist:data,itemlist1: data3,linklist:data2 });
                    })
                })
    
            }
        })
    })
}

// 详情页
indexController.deta = function(req,res,next){
    // 获取栏目列表
    itemModel.find().sort({order:1}).exec(function(err,data){
        if(err){
            console.log('添加数据失败');
        }else{
            articleModel.find({_id:req.params._id}).exec(function(error,data1){
                if(error){
                   console.log('查询数据失败');
                }else{
                    linkModel.find().exec(function(error,data2){
                        // 查完分配数据
                        res.render('deta', { itemlist: data,articledeta:data1,linklist:data2 });
                    })
                }
            })
        }
    })
}

// 暴露控制器
module.exports = indexController;