var express = require('express');
var router = express.Router();

// 引入前台控制器
var indexController = require('../controllers/indexController');

/* 首页 */
router.get('/',indexController.index);

// 列表页
router.get('/list/:_id',indexController.list);

// 详情页
router.get('/deta/:_id',indexController.deta);

module.exports = router;
