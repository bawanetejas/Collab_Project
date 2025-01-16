
const Profile = require("../models/Profile");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// add username
// change photo
// change password
// add DOB , contact no, about,gender


exports.addData=async(req,res)=>{

    try{

        const {dob,gender,contact,about,id} = req.body

        if(!dob || !gender || !contact || !about){
            return res.status(404).json({
                success:false,
                message:"All field are required"
            });
        }
        await Profile.findOneAndUpdate({_id:id},{
                                about,dateOfBirth:dob,gender,contactNumber:contact,
                                },{new:true});
    
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully"
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Not able to add data"
        })
    }
}

exports.changePassword=async (req,res)=>{
    try{
        // console.log("change password",req.body,req.user)
        const {id} = req.user
        
        const {password} = req.body
        
        const user = await User.findById({_id:id});

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }
   
        let hashPass = await  bcrypt.hash(password,10);
        user.password=hashPass;
        await user.save();

        return res.status(200).json({
            success:true,
            message:"Password updated successfully"
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Not able to update password"
        })
    }
}