const {User}=require('../models/user');
const jwt=require('jsonwebtoken');

const signup=async (req,res)=>{
    try {
        const {email,password}=req.body;
        const userAvailaible=await User.find({email});
        if(userAvailaible.length>0){
            return res.status(400).json({error:'User already exists'});
        }
        const user=await User.create({email,password});
        return res.status(201).json({user});
        
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}


const login=async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email});
        
        if(!user){
            return res.status(400).json({error:'User not found'});
        }
        if(user.password!==password){
            return res.status(400).json({error:'Invalid password'});
        }
        const id=user._id;
        //console.log(id);
        const token=jwt.sign({id},process.env.JWT_SECRET_KEY,{expiresIn:'1d'});
        //console.log(id,"kfefwk");
        res.cookie('token',token,{httpOnly:true});
        return res.status(200).json({token:token,
            msg:"Logged in successfully"
        });
        
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}

const logout=async (req,res)=>{
    try {
        res.clearCookie('token');
        return res.status(200).json({message:'Logged out successfully'});
        
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}

module.exports={
    login,
    signup,
    logout
}
