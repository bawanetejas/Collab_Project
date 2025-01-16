
const mongoose = require("mongoose")

const progresSchema = new mongoose.Schema({

    taskId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task"
    },
    completedTodo:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Todo"
    }]
    
})

module.exports = mongoose.model("Progress",progresSchema);