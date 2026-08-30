const adminAuth=(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(500).json({
                message:"Access Deneid"
            })
        }
        next()
    }
}
module.exports=adminAuth;