
const User = require("../models/User")

const JWT = require("jsonwebtoken");

exports.auth = async(req,res,next)=>{
    try{

        const token = req.body.token || req.header("Authorization").replace("Bearer ","");

        
        // console.log(req.header("Authorization").replace("Bearer ",""))
        if(!token){
            return res.status(404).json({
                success:false,
                message:"token not found"
            })
        }

        try{
            const Payload = JWT.verify(token,process.env.JWT_SECRET)
            
            req.user = Payload
            // console.log(req.user)
        }catch(error){
            return res.status(404).json({
                success:false,
                message:"Token is invalid"
            })
        }
        next();

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}