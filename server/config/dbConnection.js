
const mongoose = require("mongoose");
require("dotenv").config();
exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>console.log("DB connection is successfull"))
    .catch((error)=>console.log("error in dbconnection -->",error))
}