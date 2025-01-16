
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
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
        type:String,
        required:true
    },
    member:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    team:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Team",
        
    },
    todos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Todo"
    }],
    taskProgress:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Progress"
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Task",taskSchema);

