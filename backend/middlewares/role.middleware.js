const authRoles=(...allowedroles)=>{
    return(req,res,next)=>{

        if(!allowedroles.includes(req.user.role)){
            return res.status(403).json({message:"acces denied"})
        }else{
            next()
        }
    }
}
module.exports=authRoles