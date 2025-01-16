
const mongoose = require("mongoose");

const teamSchema =new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },

    lead:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    member:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        
    }],
    tasks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task",
    }]

},
{
    timestamps:true
}
)

module.exports = mongoose.model("Team",teamSchema);