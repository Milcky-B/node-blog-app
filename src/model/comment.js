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
        ref:"users"
    },
    blogID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"blogs"
    }
})

const comment=mongoose.model("Comments",commentSchema)

module.exports=comment