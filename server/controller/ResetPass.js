
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator")
const User = require("../models/User")
const Otp = require("../models/Otp")

exports.sendresetotp = async (req,res)=>{
    try{

        const {email}=req.body
        const user = await User.findOne({email:email});

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User does not exist"
            })
        }

        let otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })

        let checkOtp = await Otp.findOne({otp:otp});

        while(checkOtp){

            otp= otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            })

            checkOtp = await Otp.findOne({otp:otp});
        }

        const otpCreate = await Otp.create({
            email,
            otp
        });

        return res.status(200).json({
            success:true,
            message:"Otp sent successfully"
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}


exports.resetPassword = async(req,res)=>{
    try{

        const {email,otp,password} = req.body
        console.log(req.body)
        const dbOtp = await Otp.findOne({email:email});
        
        if(!dbOtp){
            return res.status(404).json({
                success:false,
                message:"Otp not found"
            })
        }
        if(otp !== dbOtp.otp){
            return res.status(404).json({
                success:false,
                message:"Otp does not match"
            })
        }
        
        const hashPass = await bcrypt.hash(password,10);

        await User.findOneAndUpdate({email:email},{password:hashPass},{new:true});

        return res.status(200).json({
            success:true,
            message:"Password reset successfully"
        });


    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}