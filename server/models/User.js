
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    image:{
        type:String,
        required:true,
        trim:true
    },
    teams:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Team",
            
        }
    ],
    tasks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Task",
        }
    ],
    todos:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Todo",
            
    }],
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date
    },
    profile:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile"
    }

},
{
    
    timestamps:true,
    
});

module.exports = mongoose.model("User",userSchema);