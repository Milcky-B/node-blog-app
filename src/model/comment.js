const mongoose=require("mongoose")

const commentSchema=new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    commenterID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    blogID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Blogs"
    }
})

const comment=mongoose.model("Comments",commentSchema)

module.exports=comment