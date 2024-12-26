const {User}=require('../models/user');
const jwt=require('jsonwebtoken');

const auth=async (req,res,next)=>{
    try {
        const token=req.cookies.token || req.body.token;
        if(!token){
            return res.status(401).json({error:'Unauthorized'});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY );
        const user=await User.findById(decoded.id);
        if(!user){
            return res.status(401).json({error:'Unauthorized'});
        }
        req.user=user;
        next();
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}

module.exports=auth;