const jwt=require('jsonwebtoken')
const verifyToken=(req,res,next)=>{
    const token= req.headers["authorization"]?.split(" ")[1]

    if(token){
        const user=jwt.verify(token,'secret')
        req.user=user
        next()
    }else{
        return res.status(401).json({ message: 'No token provided' });

    }
}
module.exports=verifyToken