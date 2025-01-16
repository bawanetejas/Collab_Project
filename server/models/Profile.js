
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    about:{
        type:String,
        trim:true
    },
    gender:{
        type:String
    },
    dateOfBirth:{
        type:Date
    },
    contactNumber:{
        type:String
    }
})


module.exports = mongoose.model("Profile",profileSchema);