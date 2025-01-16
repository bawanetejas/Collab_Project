
const User = require("../models/User")
const Team = require("../models/Team");
const Task = require("../models/Task");


//create 
//read
//update 
//delete

exports.createTeam = async(req,res)=>{
    try{
        const {name} = req.body;

        
        const {email,id} = req.user;


        if(!name || !id){
            return res.status(404).json({

                success:false,
                message:"All fields are required"
            })
        }
        const teamName = await Team.create({
            name,
            lead:id,
            
        })

        const user =await User.findByIdAndUpdate({_id:id},{$push:{teams:teamName._id}},{new:true}).populate("teams");

        return res.status(200).json({
            success:true,
            message:"Team is created successfully",
            data:user
        })


    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

//get all teams its user routes

// add member to the team

exports.addMember = async(req,res)=>{
    try{
        const{teamId,email} = req.body;
        // console.log(req.body)
        const adduser  = await User.findOne({email:email});

        if(!adduser){
            return res.status(404).json({
                success:false,
                message:"user not found"
            });
        }

        if(adduser.teams.includes(teamId)){
            return res.status(400).json({
                success:false,
                message:"Member already in the team"
            })
        }


        // find the team and add member to it
        const team = await Team.findByIdAndUpdate({_id:teamId},{
                                                    $push:{member:adduser._id}    
                                                    },{new:true});


        // find  member and add team to it
        const userTeam =  await User.findByIdAndUpdate({_id:adduser._id},{
                                                         $push:{teams:teamId}   
                                                        },{new:true});
                                                        
        return res.status(200).json({
            success:true,
            message:"Member is added"
        })

    }catch(error){

        return res.status(500).json({
            success:false,
            message:"Internal server error"
        });

    }
}


exports.getAllTeamData = async(req,res)=>{
    try{

        const {id} = req.body;
        // console.log(id)
        let teamData = await Team.findById({_id:id}).populate("lead").populate("member").populate("tasks").exec();;

        
        if(!teamData){
            return res.status(404).json({
                success:false,
                message:"Something went wrong"
            })
        }

        // make teamData with "let" because we changing it
        teamData = teamData.toObject();

        for(let i =0;i<teamData.tasks.length;i++){
            const task = await Task.findById(teamData.tasks[i]._id).populate("taskProgress");
            
            const allTodos = task.todos.length;
            const completedTodos = task.taskProgress.completedTodo.length;

            teamData.tasks[i].progressPercentage = allTodos === 0 ? 0: Math.round((completedTodos/allTodos)*100);

        }

        return res.status(200).json({
            success:true,
            message:"Fetche All Team Data",
            data:teamData,
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

