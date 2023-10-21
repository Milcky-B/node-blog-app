const mongoose=require("mongoose")
const Comments=require("../model/comment")
const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please Enter A Title"],
        trim:true
    },
    snippet:{
        type:String
    },
    body:{
        type:String,
        required:[true,"What is a blog with out a body"]
    },
    writer:{
        type:String,
        required:true
    },
    ownerID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
})

blogSchema.virtual('cmts',{
    ref:'Comments',
    localField: '_id',
    foreignField: 'blogID'
})

blogSchema.methods.deleteComments=async function(){
    const comment= await Comments.find({blogID:this._id.toString()})
    comment.forEach((com)=>{
        com.deleteOne()
    });
}

const blog=mongoose.model("Blogs",blogSchema)

module.exports=blog