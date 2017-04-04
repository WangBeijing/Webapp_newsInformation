var express = require('express');
var router = express.Router();

var multiparty = require('multiparty');
var images = require("images");
router.post("/imgupload", function(req, res) {
	var form = new multiparty.Form();
	form.parse(req, function(err, fields, files) {
		var aFile = files.editorFile;
		console.log(req.headers);
		if(err) {
			console.log(err)
		} else {
			var result='';
			for(var i = 0; i < aFile.length; i++) {
				var path = aFile[i].path;
				var size = aFile[i].size;
				var origName = aFile[i].originalFilename;
				if(size > 2 * 1024 * 1024) {
					res.status(200).end('图片尺寸大！')
					return;
				} else {
					images(path)
						.save("public/images/detail/" + origName, { //Save the image to a file,whih quality 50
							quality: 70 //保存图片到文件,图片质量为70
						});
						result='/images/detail/'+origName;
				}
			}
			res.end(result);
		}
	});
});
//图片上传
router.post("/upload", function(req, res) {
	var form = new multiparty.Form();
	form.parse(req, function(err, fields, files) {
		var aFile = files.image;
		console.log(files);
		if(err) {
			console.log(err)
		} else {
			var arr = [];
			for(var i = 0; i < aFile.length; i++) {
				var path = aFile[i].path;
				var size = aFile[i].size;
				var origName = aFile[i].originalFilename;
				if(size > 2 * 1024 * 1024) {
					res.json({
						status: false,
						message: '图片尺寸大于2MB，请压缩上传!'
					});
					return;
				} else {
					images(path)
						.save("public/images/" + origName, { //Save the image to a file,whih quality 50
							quality: 70 //保存图片到文件,图片质量为70
						});
						arr.push('/images/'+origName)
				}
			}
			res.json({
				status: true,
				message: "上传图片成功！",
				data: {
					imagePath:arr
				}
			});
		}
	});
});
module.exports = router;
