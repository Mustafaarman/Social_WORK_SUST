const express = require("express");
const router = express.Router();
const Notice = require("../model/notice");



router.get("/createnotice", function(req, res) {
	res.render("createnotice");
})

router.get('/notice/:noticeName', function (req, res) {
  Notice.find({title: req.params.noticeName}, function(err, found) {
  		if(!err) {
  			res.render("notice", {found: found});
  		}
  		else{
  			res.send(err);
  		}
  })
})
router.post("/createnotice", function(req, res) {
	const newNotice = new Notice({
		to: req.body.noticeTo,
		title: req.body.noticeTitle,
		body: req.body.noticeBody
	})
	newNotice.save();
	res.send(req.body);
})

module.exports = router;