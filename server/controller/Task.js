
const mongoose = require("mongoose")
const Progress = require("../models/Progress");
const Task = require("../models/Task");
const Team = require("../models/Team");
const User = require("../models/User");


//creat task

exports.createTask=async(req,res)=>{
    try{

        const leadId = req.user.id;
        const {teamId,title,description,dueDate} = req.body

        // console.log(req.body)
        if(!teamId ||!title || !dueDate){
            return res.status(404).json({
                success:false,
                message:"All field arr required"
            })
        }

        // if lead not creating the task then return it

        
        const team = await Team.findById({_id:teamId});
        
        if(team.lead != leadId){
            return res.status(403).json({
                success:false,
                message:"Only laead can create the task"
            })
        }

        
        const task = await Task.create({
                                            title:title,
                                            description:description,
                                            dueDate:dueDate,
                                            team:teamId
                                        })
        
        // create taskProgerss
        const taskProgress = await Progress.create({taskId:task._id,completedTodo:[]});

        task.taskProgress=taskProgress._id;

        await task.save();

        // console.log("printing the task",task)

        const updateTeam = await Team.findByIdAndUpdate({_id:teamId},{
                                                           $push:{tasks:task._id} ,
                                                        },{new:true});


        // console.log(updateTeam);
        
        return res.status(200).json({
            success:true,
            message:"Task created successfully",
            updateTeam,
            task
        })
    }catch(error){

        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}



// email functionality is remaining
exports.addMemberToTask = async(req,res)=>{
    try{

        const {taskId,memberId}=req.body;
 
        const userId = req.user.id;
        
        console.log("user Id -->",userId);
        console.log(req.body)
        if(!taskId || !memberId ){
            return res.status(404).json({
                success:false,
                message:"All fields are required"
            })
        }

        const task = await Task.findById({_id:taskId}).populate({path:"team"});
        
        const moidUser = task.team.lead.toString();
        
        if(userId !== moidUser){
            return res.status(404).json({
                success:false,
                message:"Only teamlead can add member"
            })
        }
        // console.log("line 101");
        const updatedTask = await Task.findByIdAndUpdate({_id:taskId},{
                                                           $push:{member:memberId}     
                                                            },{new:true});


        // add email to know added in task
        return res.status(200).json({
            success:true,
            message:"Member is added",
            data:updatedTask
        })
        
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

exports.deleteTask= async(req,res)=>{
    try{

        const {taskId} = req.body;
        const userId = req.user.id
        
        const task = await Task.findById({_id:taskId}).populate({path:"team"});

        console.log(task.team.lead.toString());
        if(task.team.lead.toString() !== userId){
            return res.status(404).json({
                success:false,
                message:"Only team lead can delet the task"
            })
        }

        console.log("i am here",task)
        // await Progress.deleteMany({_id: {$in: task.taskProgress}});
        // pull the task from the team;

        const team = await Team.findByIdAndUpdate({_id:task.team._id},{
                                                      $pull:{tasks:taskId}  
                                                    },{new:true});

        // delete the task progress
        await Progress.findByIdAndDelete(task.taskProgress);
        await Task.findByIdAndDelete(taskId);
        return res.status(200).json({
            success:true,
            message:"Task deleted successfully"
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Soneting went wrong"
        })
    }
}

// edit task is remaining

//get all task with progress

exports.getAllTaskData = async(req,res)=>{
    try{
        const {taskId} = req.body

        const userId = req.user.id
        let task = await Task.findById(taskId).populate({path:"taskProgress",
                                                         populate:{path:"completedTodo"}
                                                        }).populate({path:"todos",
                                                            populate:{path:"member"}
                                                        }).exec();

        //completed to-do and incomplete todo ko
        // my todos
        task = task.toObject()
        const allTodos = task.todos.length;
        const completedTodos = task?.taskProgress?.completedTodo;

        // user-todo
        task.myTodos = task.todos.filter((todo)=>todo.member._id === userId);

        //incomplete all todos
        task.incompleteTodo = task.todos.filter((todo)=> todo.complete === false );

        //task progress
        task.progressPercentage = allTodos === 0 ? 0  : ((completedTodos/allTodos)*100);
        
        return res.status(200).json({
            success:true,
            data:task
        })

    }catch(error){

        return res.status(500).json({
            success:false,
            message:"Internal server Error"
        })
    }
}


// My project task 

exports.createMytask=async(req,res)=>{

    // console.log("res of data",req.body)
    try{

        const {title,dueDate} = req.body
        
        const id = req.user.id

        const task = await Task.create({title,dueDate})
        const taskProgerss = await Progress.create({taskId:task._id,completedTodo:[]});
        task.taskProgress = taskProgerss._id;
        await task.save();
        const user = await User.findByIdAndUpdate({_id:id},{$push:{tasks:task._id}},{new:true});

        return res.status(200).json({
            success:true,
            message:"Task created successfully",
            data:user
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Not able to create task",
            
        })
    }
}

// get all  of my-tasks

exports.getAllDataMyTask=async(req,res)=>{
    try{
            const id = req.user.id
            let user = await User.findById(id).populate({path:"tasks",populate:{path:"taskProgress"}});

            if(!user){
                return res.status(404).json({
                    success:false,
                    message:"User not found"
                })
            }
            user = user.toObject();
            for(let i=0;i<user?.tasks.length;i++){
                const todoLength = user?.tasks[i].todos.length;
                const completedTodo = user?.tasks[i]?.taskProgress?.completedTodo?.length
                // console.log(completedTodo)
                user.tasks[i].progress = todoLength === 0 ? 0 : Math.round((completedTodo/todoLength)*100);
            }


            return res.status(200).json({
                success:true,
                message:"Data fetched",
                data:user.tasks
            })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

exports.getMyTaskDetail=async(req,res)=>{
    try{

        const {taskId} = req.body
        let itask = await Task.findById(taskId).populate("todos").populate("taskProgress");
        let task = await Task.findById(taskId).populate({path:"taskProgress",populate:{path:"completedTodo"}}).populate({path:"todos",populate:{path:"member"}});
        task =task.toObject();
        const todoLength = task.todos.length;
        const completedTodo = task?.taskProgress?.completedTodo?.length
        // console.log(completedTodo)
        task.incomplete = itask.todos.filter((todo)=> !itask?.taskProgress?.completedTodo.includes(todo._id));
        task.progress = todoLength === 0 ? 0 : Math.round((completedTodo/todoLength)*100);

        return res.status(200).json({
            success:true,
            message:"Data fetch successfully",
            data:task,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Not able to get data"
        });
    }
}