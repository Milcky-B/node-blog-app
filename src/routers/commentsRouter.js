const { Router } = require("express");
const Blogs=require("../model/blog")
const Comments = require("../model/comment");
const midAuth=require("../middleware/midAuth")
const router = Router();

router.post("/:id",midAuth, async (req, res) => {
  try {
    const blog=await Blogs.findById(req.params.id)
    if(!blog) return res.status(400).send("The post doesn't exist")
    req.body["blogID"]=blog._id
    req.body["commenterID"]=req.user.id
    const comment = new Comments(req.body);
    await comment.save();
    res.send(comment);
  } catch (err) {
    res.status(500).send();
  }
});

router.get("/",midAuth,async (req, res) => {
  try {
    const comment = await Comments.find({commenterID:req.user.id});
    if(comment.length===0) res.status(400).send({error:"You have no comments"})
    res.send(comment);
  } catch (err) {
    res.status(500).send();
  }
});

router.delete("/:id",midAuth,async(req,res)=>{
  try {
    const comment=await Comments.findOne({_id:req.params.id,commenterID:req.user.id})
    if(!comment) res.status(400).send({error:"No comment found by that ID"})
    await comment.deleteOne()
    res.send(`${comment.comment} deleted`)
  } catch (err) {
    res.status(500).send()
  }
})

module.exports = router;
