const mongoose=require("mongoose")
const validator=require("validator")
const jwt=require("jsonwebtoken")


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter A name"],
        trim:true
    },
    age:{
        type:Number,
        required:[true,"Please Enter An age"],
        validate(value){
            if(value<0) throw new Error("Age can't be a negative number")
        }
    },
    email:{
        type: String,
        unique:true,
        required: true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error("Invalid Email")
        }
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        trim:true
    },
    address:[{
        country:{
            type:String,
            trim:true
        },
        city:{
            type:String,
            trim:true
        }
    }],
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
},{timestamps:true})

userSchema.methods.createToken=async function(){
    const token=jwt.sign({id:this._id.toString()},process.env.JWT_SECRET)
    this.tokens.push({token})
    await this.save()
    return token
}

userSchema.methods.toJSON = function () {
    const userObject = this.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.createdAt
    delete userObject.updatedAt
    delete userObject.__v
    return userObject
   }

const user=mongoose.model('User',userSchema)

module.exports=user