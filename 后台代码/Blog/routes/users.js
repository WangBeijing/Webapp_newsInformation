var express = require('express');
var router = express.Router();
var mongoose = require('../config/mongoose');
var multiparty = require('multiparty');
var images = require("images");
var models = require('../models/models');
var User = models.User;
var ADD = models.ADD;

router.post('/gg', function(req, res) {
	var tel = req.body.id
	var myname = req.body.nickname
	console.log(myname)
	User.update({
			tel: tel
		}, {
			nickname: myname
		},
		function(err, user) {});
});
router.post('/xiugan', function(req, res) {
	var tel = req.body.id
	console.log(req.body.sex)
	User.update({
			tel: tel
		}, {
			sex: req.body.sex
		},
		function(err, user) {
			if(err) {
				console.log(err)
			} else {
				res.status(200).json({
					status: true,

				});
			}
		});
});

router.get('/name', function(req, res) {
	var id = req.query.id
	User.find({
			tel: id
		})
		.select('nickname sex avator')
		.exec(function(err, goods) {
			if(err) {
				console.log(err)
			} else {
				res.json(goods[0]);
			}
		})
})
router.get('/addd', function(req, res) {
	var urid = req.query.id
	console.log(urid)
	ADD.find({
			_id: urid
		},function(err, goods) {
			if(err) {
				console.log(err)
			} else {
				
				res.json({
						status: true,
						dz: goods[0]
					})
			}
		})
		
})
router.get('/ad', function(req, res) {
	var id = req.query.id
	console.log(id)
	ADD.find({
			user: id
		})
		.exec(function(err, goods) {
			if(err) {
				console.log(err)
			} else {
				res.json({
					x: goods
				});
			}
		})
})
router.post('/add', function(req, res) {
	var add = new ADD(req.body);
	var x = add._id
	add.ur = 'address_add.html?id=' + x;
	add.user=req.body.user
	var z = req.body.urlid //url id
	var name = req.body.name;
	var phone = req.body.phone;
	var province1 = req.body.province1;
	var city1 = req.body.city1;
	var area1 = req.body.area1;
	var xxad = req.body.xxad;
	var yzbm = req.body.yzbm;
	var sfz = req.body.sfz;
	if(req.query.id != 'undefined') {
		ADD.update({
			_id: req.query.id
		}, {
			name: name,
			phone: phone,
			province1: province1,
			city1: city1,
			area1: area1,
			xxad: xxad,
			yzbm: yzbm,
			sfz: sfz,
		}, function(err) {
			if(err) {
				console.log(err)
			} else {
				res.json({
					status: true
				})
			}
		});

	} else {
		add.save(function(err) {
			if(err) {
				console.log(err)
			} else {
				res.json({
					status: true
				})
			}
		})
	}

})

//登录用户

//注册
router.post('/mobile/register', function(req, res) {
	var user = new User(req.body);
	user.nickname = '';
	user.avator = '';
	console.log(req.body)
		//查询数据库
	User.find({
		'tel': req.body.tel
	}, function(err, users) {
		if(err) {
			console.log(err);
			return;
		}
		if(users.lenght) {
			console.log('账号已存在')
		} else {
			//存储		
			user.save(function(err) {
				if(err) {
					console.log(err);
				} else {
					console.log('注册成功');
					res.cookie('username', req.body.tel);
					res.redirect('/mobile/activityshop.html');
				}
			});
		}
	});
});
//登录用户
router.get('/mobile/Blogin.html', function(req, res) {
	res.render('Blogin', {
		title: '短信登录'
	})
});

router.get('/mobile/Plogin.html', function(req, res) {
	res.render('Plogin', {
		title: '密码登录'
	})
});
router.post('/mobile/login', function(req, res) {

	User.find(req.body, function(err, users) {
		if(err) {
			console.log(err)
		} else {
			if(users.length) {

				res.status(200).json({
					status: true,
					message: '登录成功！',

				});

			} else {
				res.status(200).json({
					status: false,
					message: '账号或者密码错误！'
				});

			}
		}
	})
})
router.post('/img', function(req, res) {
	//		console.log(req.headers.cookie.oldman)
	var form = new multiparty.Form();
	form.parse(req, function(err, fields, files) {
		var img = files.img[0];
		var x = parseFloat(fields.x[0]);
		var y = parseFloat(fields.y[0]);
		var w = parseFloat(fields.w[0]);
		var h = parseFloat(fields.h[0]);
		var dw = parseFloat(fields.dw[0]);
		var dh = parseFloat(fields.dh[0]);
		var id = fields.id[0]
		if(err) {
			console.log(err)
		} else {
			var path = img.path;
			var size = img.size;
			var origName = img.originalFilename;
			if(size > 2 * 1024 * 1024) {
				res.json({
					status: false,
					message: '图片尺寸大于2M，请压缩上传'
				});
				return;
			} else {
				images(images(path).size(dw, dh), x, y, w, h)
					.size(120, 120)
					.save("public/images/canvas/" + origName, { //Save the image to a file,whih quality 50
						quality: 60 //保存图片到文件,图片质量为70
					});
				result = req.headers.origin + '/images/canvas/' + origName;
			}
//			User.update({
//				tel: id
//			}, {
//				Image: result
//			}, function(err) {
//				if(err) {
//					console.log(err)
//				} else {
//					res.json({
//						status: true,
//						message: '上传图片成功',
//					});
//				}
//			})
		}
	});
})

module.exports = router;