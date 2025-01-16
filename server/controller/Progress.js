
const Task = require("../models/Task")
const Todo = require("../models/Todo");
//total length of todo array
//total length of complete todo array
//

exports.completTodo=async(req,res)=>{
    try{

        const userId = req.user.id;

        const {taskId,todoId}=req.body;

        if(!taskId || !todoId){
            return res.status(404).json({
                success:false,
                message:"All fields are required"
            })
        }

        const todo = await Todo.findById(todoId);

        
        if(userId !== todo?.member){
            return res.status(404).json({
                success:false,
                message:"Only valid assigned member can mark task"
            })
        }

        const taskProgress = await Progress.findOne({taskId:taskId});

        if(!taskProgress){
            return res.status(404).json({
                success:false,
                message:"Task progres does not exist"
            })
        }

        if(taskProgress?.completedTodo?.indcludes(todoId)){
            return res.status(404).json({
                success:false,
                message:"Task is alredy mark as completed"
            })
        }

         taskProgress?.completedTodo.push(todoId);
         taskProgress.save();

         return res.status(200).json({
            success:true,
            message:"Task mark as completd"
         })


    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}


//complete todo controller must be here