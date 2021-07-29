const mongoose = require("mongoose");
const Schema =  mongoose.Schema






const StudentSchema = new Schema({
	batch: {
		type: Number,
		required: [true, 'student batch num is must required'],
    	max: [50, 'Batch number is so long']
	},
	name: {
		type: String,
		required: [true, 'student name is must required']
	},
	reg_no: {
		type: Number,
		required: [true, 'student reg num is must required'],
		min: [199000000,'Registration number is so short'],
    	max: [2050233090, 'Registration number is so long']
	},
	phone: {
		type: Number,
		required: [true, 'student phone num is must required'],
    	max: [99999999999, 'phone number is so long']
	},
	email: {
		type: String,
	},
	address: String,
	img: String,
	reg_date: { type: Date, default: Date.now }
})

const Student = mongoose.model('Student', StudentSchema);


module.exports = Student