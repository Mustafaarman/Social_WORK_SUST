
const mongoose = require("mongoose");
const Schema =  mongoose.Schema






const noticeSchema = new Schema({
	to: String,
	title: String,
	body: String,
	date: { type: Date, default: Date.now }
})

const Notice = mongoose.model('Notice', noticeSchema);


module.exports = Notice