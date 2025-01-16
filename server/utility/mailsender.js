
const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async(email,title,body)=>{
    // console.log(email,title,body)
    try{

        const transporter= nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

        let info = await transporter.sendMail({
            from:'Tej from COLLAB || bawanetej89@gmail.com',
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })

        return ;

    }catch(error){
        console.log("Error while sending the mail-->",error)
    }
}

module.exports = mailSender;