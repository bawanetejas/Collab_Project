
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    dueDate:{
        type:String
    },
    // task:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Task",
    //     required:true
    // },
    member:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    complete:{
        type:Boolean,
        
        default:false
    }
},
{
    timestamps:true
})

module.exports = mongoose.model("Todo",todoSchema)