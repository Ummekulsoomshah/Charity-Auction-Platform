const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/liveauctiondb')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    role: { 
        type: String, 
        enum: ["admin", "bider",], 
        default: "bider" 
      }, // Default role
})
module.exports=mongoose.model('User',userSchema)