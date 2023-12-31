const {Router}=require("express")
const Blogs = require("../model/blog")
const midAuth=require("../middleware/midAuth")
const router=Router()

router.post('/',midAuth,async(req,res)=>{
    try {
        req.body["ownerID"]=req.user._id
        req.body["writer"]=req.user.name
        const blog=new Blogs(req.body)
        await blog.save() 
        res.send(blog)
    } catch (err) {
        res.status(400).send()
    }
})

router.get('/',midAuth,async(req,res)=>{
    try {
        const blog=await Blogs.find({ownerID:req.user._id})
        if(blog.length===0) return res.status(400).send({error:"You have no posts yet"})
        res.send(blog)
    } catch (err) {
        res.status(500).send()
    }
})

router.get('/comments/:id',midAuth,async(req,res)=>{
    try {
        const blog=await Blogs.findById(req.params.id)
        if(!blog) {
            return res.status(400).send({error:"No post with that id"})
        }
        else{
        await blog.populate('cmts')
        res.send(blog.cmts)
    }
    } catch (err) {
        res.status(500).send()
    }
})

router.get('/removeAll/:id',async(req,res)=>{
    console.log(req.params.id)
    try {
        const blogs=await Blogs.find({ownerID:req.params.id})
        if(blogs.length===0) return res.status(400).send({error:"No post with that id"})
        blogs.forEach( (blg)=>{
            blg.deleteComments();
            blg.deleteOne();
        })
        res.send({message:"Success"})
    } catch (err) {
        res.status(500).send()
    }
})

router.delete('/:id',midAuth,async(req,res)=>{
    try {
        const blog=await Blogs.findOne({_id:req.params.id,ownerID:req.user._id})
        if(!blog) return res.status(400).send({error:"No post with that id"})
        blog.deleteComments();
        blog.deleteOne();
        res.send({message:"Success"})
    } catch (err) {
        res.status(500).send()
    }
})

module.exports=router