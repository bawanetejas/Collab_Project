
const JWT = require("jsonwebtoken")
const User = require("../models/User")
const otpGenerator = require("otp-generator")
const Otp = require("../models/Otp")
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");


exports.sendotp = async(req,res)=>{
    try{

        const {email,password,confirmPassword} = req.body;

        if(!email || !password || !confirmPassword){
                return res.status(404).json({
                success:false,
                message:"All fields are required "
            })
        }

        if(password !== confirmPassword){
            return res.status(404).json({
                success:false,
                message:"Passwords does not match"
            })
        }
        const user = await User.findOne({email});

        if(user){
            return res.status(404).json({
                success:false,
                message:"User is already exist"
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

        console.log(email,otp);

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


exports.signup = async(req,res)=>{
    try{
        const{
            firstName,
            lastName,
            email,
            otp,
            password,
            confirmPassword,
        }  = req.body

        // console.log("all data from the signup controller--->",req.body)
        if(!firstName || !lastName || !email || !otp || !password || !confirmPassword){
            return res.status(404).json({
                success:false,
                message:"All field are required"
            });
        }

        const dbOtp = await Otp.findOne({email}).sort({createdAt:-1}).limit(1);
        console.log("otp of db -->",dbOtp.otp)
        if(!dbOtp){
            return res.status(404).json({
                success:false,
                message:"Otp does not found"
             });
        }
        if(dbOtp.otp !== otp){
            return res.status(404).json({
               success:false,
               message:"Otp does not match"
            });
        }


        const hashPass = await bcrypt.hash(password,10)
        const profile  = await Profile.create({
            gender:null,
            about:null,
            contactNumber:null,
            dateOfBirth:null
        })
        const user = await User.create({
            firstName,
            lastName,
            email,
            profile:profile._id,
            password:hashPass,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        return res.status(200).json({
            success:true,
            message:"Account created successfully"
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

exports.login = async(req,res)=>{

    try{

        const{email,password}=req.body

        if(!email || !password){
            return res.status(404).json({
                success:false,
                message:"All fields are required"
            })
        }

        const user = await User.findOne({email}).populate("teams").populate("profile");

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }

        const dbPass = user.password;

        if(await bcrypt.compare(password,dbPass)){

            const Payload={
                email:user.email,
                id:user._id
            }

            const token = JWT.sign(Payload,process.env.JWT_SECRET,{
                expiresIn:"30d"
            });

            user.token = token;
            user.password = undefined;

            return res.status(200).json({
                success:true,
                token:token,
                user,
                message:"Login successfull"
            })
        }else{
            return res.status(401).json({
                success:false,
                message:"Password does not match"
            })
        }
        
    }catch(error){

        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}


