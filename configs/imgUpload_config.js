// 图片上传配置文件

// 引入 multer 模块
var multer = require('multer')
// 引入路径模块
var path = require('path');
// 引入格式化时间模块
var timestamp = require('time-stamp');
// 引入 uid 模块  (生成唯一的随机数)
var uid = require('uid');


/**
 * 函数名称：imgUpload
 * 功能：图片上传
 * 参数：
 *      imgPath (String) - 接收图片时保存路径  
 *      imgType (Array)  - 允许用户上传的图片
 *           例：['image/jpeg', 'image/png', 'image/gif'] 
 *      fileSize (Number)- 限制文件的大小（单位是字节）
 * 返回值：upload 对象
 * 作者：simon
 * 版本：1.0.0
 * 日期：2018-06-11
 */
function imgUpload(imgPath,imgType,fileSize){
    // 文件上传的基本配置
    var storage = multer.diskStorage({
        // 
        destination: function (req, file, cb) {
            // 接收图片的文件夹
            cb(null, imgPath)
        },
        // 设置 接收后的文件名称
        filename: function (req, file, cb) {
            // 返回路径的扩名
            var extName = path.extname(file.originalname);
            // 配置文件名
            cb(null, timestamp() + '-' + uid() + extName);
        }
    })

    // 过滤函数的设置
    function fileFilter(req, file, cb) {
        // 判断您上传的文件类型是不是我定义的
        if (imgType.indexOf(file.mimetype) == -1) {
            // 拒绝这个文件，使用`false`，像这样:
            cb(null, false)
            // 如果有问题，你可以总是这样发送一个错误:
            cb(new Error('只允许上传 jpeg png gif 格式的图片'));
        } else {
            // 接受这个文件，使用`true`，像这样:
            cb(null, true)
        }
    }

    // 文件上传的配置
    var upload = multer({
        // 基本配置
        storage: storage,
        // 文件过滤函数
        fileFilter: fileFilter,
        // 文件大小
        limits: {
            // 单位 字节
            fileSize: fileSize  //  (5M) 
        }
    })

    // 返回值
    return upload;
}

// 暴露图片上传函数
module.exports = imgUpload;