var mongoose = require('../config/mongoose');
var models = {};
//文章信息
var goodsSchema = mongoose.Schema({
	title: {
		type: String,
	},
	TAG: {
		type: String,
	},
	classify: {
		type: String,
	},
	goodImage: [String],
	update: String,
	timeStamp:Date,
	goodsInfo:String
});
models.Good = mongoose.model('Good', goodsSchema)
module.exports = models;