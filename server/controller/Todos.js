
const Todo = require("../models/Todo")
const Task = require("../models/Task")
const Team = require("../models/Team")
const User = require("../models/User")
const mailSender = require("../utility/mailsender")
const Progress = require("../models/Progress")
const TodoMail = require("../mail/Todomail")
const { completTodo } = require("./Progress")


//create to-do 

exports.createTodo = async(req,res)=>{
    try{
           
            // const userId = req.user.id;
            // console.log(userId);
            const {title,description,dueDate,taskId,assigniId} = req.body;

            if(!title || !description || !dueDate || !taskId || !assigniId){
                return res.status(404).json({
                    success:false,
                    message:"All fields are required"
                })
            }

            const user = await User.findById(assigniId);

            if(!user){
                return res.status(404).json({
                    success:false,
                    message:"User not valid"
                })
            }
            const ctodo = await Todo.create({
                title,
                description,
                dueDate,
                member:assigniId
            });

            
            // mail send is remaining ----> Done
        
            const updatedTask = await Task.findByIdAndUpdate({_id:taskId},{
                                                              $push:{todos:ctodo._id}  
                                                            },{new:true})

            await mailSender(user?.email,"Task assigne",TodoMail(title,updatedTask.title,dueDate,user?.firstName));

            return res.status(200).json({
                success:true,
                message:"Todo assigned successfully"
            })

    }catch(error){

        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}
//edit to-do
exports.editTodo = async (req,res)=>{
    try{
         const {title,description,dueDate,todoId} = req.body;

        //  console.log(req.body);
         if(!title || !description || !dueDate || !todoId){
            return res.status(404).json({
                success:false,
                message:"All fields are required"
            })
         }

         const updateTodo = await Todo.findByIdAndUpdate({_id:todoId},{
                                                          title:title,
                                                          description:description,
                                                          dueDate:dueDate      
                                                    },{new:true});

        return res.status(200).json({
            success:true,
            message:"To-do edited successfully"
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })

    }
}
//delet to-do

exports.deleteTodo = async(req,res)=>{
    try{
            const {todoId,taskId}= req.body

            if(!todoId){
                return res.status(404).json({
                    success:false,
                    message:"Todo is not given"
                })
            }

            await Progress.findOneAndUpdate({taskId:taskId},{$pull:{completedTodo:todoId}},{new:true});
            await Task.findByIdAndUpdate({_id:taskId},{$pull:{todos:todoId}},{new:true});

            await Todo.findByIdAndDelete(todoId);
            
            return res.status(200).json({
                success:true,
                message:"Todo Deleted successfully"
            })
    }catch(error){

            return res.status(500).json({
                success:false,
                message:"Something went wrong"
            })
    }
}

exports.markCompleted=async(req,res)=>{
    try{

        const {taskId,todoId} = req.body

        await Todo.findByIdAndUpdate({_id:todoId},{complete:true},{new:true});
        await Progress.findOneAndUpdate({taskId:taskId},{$push:{completedTodo:todoId}},{new:true});

        return res.status(200).json({
            success:true,
            message:"task mark as completed"
        })
        
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Not able to mark todo as completed"
        })
    }
}