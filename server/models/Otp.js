
const mongoose= require("mongoose");
const mailSender = require("../utility/mailsender");
// const OtpMail = require("../mail/OtpMail");
const otpMail = require("../mail/OtpMail");

const otpSchema = new mongoose.Schema({
    otp:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    }
})

const sendVerificationEmail = async(email,otp)=>{
    try{
        const mailResponse = await mailSender(email,"Email Verification",otpMail(otp));

        // console.log("mailResponse -->",mailResponse)
    }catch(error){
        console.log("Error while sending the mail",error);
        throw error;
    }
}

otpSchema.pre("save",async function (next){
    console.log(this.otp,this.email)
    await sendVerificationEmail(this.email,this.otp);
    next();
})


module.exports = mongoose.model("Otp",otpSchema);