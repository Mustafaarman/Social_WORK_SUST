const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const Notice = require("./model/notice");
const Student = require("./model/student");



app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb+srv://admin-arman:admin1234@cluster0.xd4wu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(require("./routes/routerNotice"));


app.get("/", function(req, res) {
	Notice.find({ title: { $ne: null } }, function(err, foundNotice) {
		if(!err) {
			res.render("home", {foundNotice: foundNotice});
			
		}
		
	})
	
})

app.get("/students", function(req, res) {
	Student.find(function(err, found) {
		if(!err) {
			res.render("students", {found: found});
		}
		else{
		  console.log(err);
			res.send(err);	
		}
	})
	
})


app.get("/find", function(req, res) {
	res.render("find");
})

app.post("/find", function(req, res) {
	Student.findOne({reg_no: req.body.find}, function(err, found) {
		if(!err) {
			if(found != null) {
				res.send(found)
			}
			else{
				res.redirect("/find")
			}
			
		}
		else{
			res.send(err)
      
		}
	})
})


app.get("/alumni", function(req, res) {
	res.render("alumni");
})

app.get("/faculty", function(req, res) {
	res.render("faculty");
})

app.get("/dashboard", function(req, res) {
	res.render("dashboard");
})

app.get("/studentReg", function(req, res) {
	res.render("studentRegistration");
})

app.post("/studentReg", function(req, res) {
	const newstudent = new Student({
		batch: req.body.batch_number,
		name: req.body.full_name,
		reg_no: req.body.registration_number,
		phone: req.body.phone_number,
		email: req.body.email,
		address: req.body.address,
		img: req.body.img_url
	})

	newstudent.save(function(err) {
		if(err) {
			res.send(err)
		}
		else{
			res.redirect("/studentReg")
		}
	})
	
})

app.get('/batch/:batchNum', function (req, res) {
  Student.find({batch: req.params.batchNum}, function(err, found) {
  		if(!err) {
  			res.render("eachBatch", {found: found});
  		}
  		else{
  			res.send(err);
  		}
  })
})

// write a function looping through array items


app.listen(3000, function() {
	console.log("server started at http://localhost:3000");
})