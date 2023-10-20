const { Router } = require("express");
const Comments = require("../model/comment");
const midAuth=require("../middleware/midAuth")
const router = Router();

router.post("/",midAuth, async (req, res) => {
  try {
    //const comment = new Comments(req.body);
    //await comment.save();
    //res.send(comment);
  } catch (err) {
    res.status(400).send();
  }
});

router.get("/",midAuth,async (req, res) => {
  try {
    //const comment = await Comments.find({});
    res.send(comment);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
