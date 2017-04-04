var express = require('express');
var router = express.Router();
var mongoose = require('../config/mongoose');
router.get('/', function(req, res) {
	res.redirect('index-1.html');
});
var models = require('../models/models');
var Good = models.Good;
//获取当前时间
function formateDate() {
	var time = new Date();
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var day = time.getDate();
	var hour = time.getHours();
	var min = time.getMinutes();
	var second = time.getSeconds();

	month = convert(month);
	day = convert(day);
	hour = convert(hour);
	min = convert(min);
	second = convert(second);

	function convert(num) {
		if(num < 10) {
			return '0' + num
		} else {
			return num
		}
	}
	var result = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + second;
	return result;
}
formateDate();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/gx', function(req, res) {
		var id = req.query.id
		console.log(req.body)
		Good.update({
				_id: id
			}, {
				timeStamp: req.body.data.timeStamp,
				update: req.body.data.update,
				title: req.body.data.title,
				TAG: req.body.data.TAG,
				classify: req.body.data.classify,
				goodImage: req.body.data.goodImage,
				goodsInfo: req.body.data.goodsInfo,

			},
			function(err, user) {
				if(err) {
					console.log(err)
				} else {
					res.status(200).json({
						status: true,
						message: "修改成功！"

					});
				}
			});
	})
	//管理后台 上传商品
router.post('/addGoods', function(req, res) {
	var good = new Good(req.body.data);
	good.update = formateDate();
	good.timeStamp = new Date();
	console.log(good)
		//查询数据库
	Good.find({}, function(err, goods) {
		//存储		
		good.save(function(err) {
			if(err) {
				res.json({
					status: false,
					message: err
				});
			} else {
				res.status(200).json({
					status: true,
					message: "发表成功！"
				});

			}
		});
	});
});
//列表页全部数据
router.get('/dat', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	Good.find({})
	    .limit(3)
		.sort({
			'_id': -1
		})
		.exec(function(err, goods) {
			if(err) {
				console.log(err)
			} else {
				res.json(goods);
			}
		})
})
router.get('/da', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	Good.find({})
		.exec(function(err, goods) {
			if(err) {
				console.log(err)
			} else {
				res.json(goods);
			}
		})
})
router.get('/datdown', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	var page = req.query.x;
	page = parseInt(page)
	
	Good.find({})
	    .skip(page*3)
		.sort({
			'_id': -1
		})
		.limit(3)
		.exec(function(err, goods) {
			if(err) {
				console.log(err)
			} else {
				res.json(goods);
			}
		})
})
//分类获取数据
router.get('/datt', function(req, res) {
		var classify = req.query.class
		console.log(classify)
		res.header("Access-Control-Allow-Origin", "*");
		Good.find({
			classify: classify
		}, function(err, goods) {
			if(err) {
				console.log(err)
			} else {
				res.json(goods);
			}
		})
	})
	//列表页删除
router.post('/dele', function(req, res) {
		var del = req.query.id
		Good.remove({
			_id: del
		}, function(err) {
			if(!err) {
				res.status(200).json({
					status: true,
					message: "已删除！"
				});
			} else {

			}
		});
	})
	//编辑页面获取数据
router.get('/li', function(req, res) {
		res.header("Access-Control-Allow-Origin", "*");
		var id = req.query.id
		console.log(id)
		Good.find({
			_id: id
		}, function(err, goods) {
			if(err) {
				console.log(err)
			} else {
				res.json(goods[0]);
			}
		})
	})
	//搜索
router.get('/search', function(req, res) {
	var TAG = req.query.TAG
	var reg = new RegExp(TAG, 'i')
	res.header("Access-Control-Allow-Origin", "*");
	Good.find({
			$or: [ //多条件，数组
				{
					title: {
						$regex: reg
					}
				}, {
					goodsInfo: {
						$regex: reg
					}
				}
			]
		})
		.exec(function(err, goods) {
			if(err) {
				console.log(err)
			} else {
				res.json(goods);
			}
		})
})
module.exports = router