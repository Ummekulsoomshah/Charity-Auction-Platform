const express=require('express');
const app=express()
const userRoute=require('./routes/user.route')
const cookieParser=require('cookie-parser')
const cors=require('cors');
const userModel = require('./models/user.model');
const jwt=require('jsonwebtoken')
const io=require('./server')
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
//seeding data of admin
const seedAdmin=async ()=>{
    const admin=await userModel.findOne({email:"admin@gmail.com"})
    if(!admin){

       const admin= await userModel.create({
            name:'Admin',
            email:"admin@gmail.com",
            password:"admin123",
            role:"admin"
        })
    // const token=jwt.sign({_id:admin._id,role:admin.role},'secret')
    // res .status(200).json({

    // })
    }else{
        console.log('admin alr exist')
    }
}
seedAdmin()


app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/user',userRoute)
module.exports=app