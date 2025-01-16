import React, { useState } from 'react'
import ProgressBar from "@ramonak/react-progress-bar";
import { useDispatch, useSelector } from 'react-redux'
import { IoMdClose } from "react-icons/io";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import { addMemberToTeam, getAllTeamData } from '../../../servicess/teams';
import toast from 'react-hot-toast';
import { createTask } from '../../../servicess/task';

export default function ViewAllTasks() {

  const {token,user}=useSelector((state)=>state.auth)
  const {team}= useSelector((state)=>state.team)

  const [addMemberFlag,setAddMemberFlag] = useState(false);
  const [taskFlag,setTaskFlag] = useState(false);
  const [email,setEmail] = useState('');
  const [addTask,setAddTask] = useState('');
  const [tdate,setDate] = useState('');

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {teamId} = useParams();

  async function addMemberHandler(e){
         e.preventDefault();
        //  console.log("email check -->",email)
         await addMemberToTeam(teamId,email,token)
         setAddMemberFlag(false)
  }

 async function addTaskHandler(e){
    e.preventDefault();
    await createTask(teamId,addTask,tdate,token)
    getAllTeamData(teamId,token,dispatch)
    console.log("team data after call --->",team)
    // console.log("data from the task handler -->",tdate,addTask)
  }
  return (
    <div className='w-full relative h-full overflow-y-auto'>

            <div className='w-[90%] mx-auto pt-8 xl:w-[800px] flex items-center justify-start'>
                <div  onClick={()=>navigate(`/dashboard/teams`)}
                      className='py-2 px-4 relative  cursor-pointer rounded-md bg-yellow-50 
                              text-richblack-800 font-medium flex 
                              items-center gap-2 w-fit'> <MdArrowBackIosNew/> Back

                </div>
            </div>

          
          <div className='flex justify-between pt-6 items-center w-[90%] mx-auto xl:w-[800px]'>

            
              <p className='text-3xl font-bold text-richblack-5'>Team Lead {team?.lead?.firstName}</p>
              <div className='flex gap-4'>
                  <div  onClick={()=>{
                         if(user?._id !== team?.lead?._id){
                            toast.error("Only team lead can add Member")
                            return 
                          }
                        setAddMemberFlag(!addMemberFlag)}}
                        className='px-4 cursor-pointer py-2 w-fit font-medium rounded-md text-[16px]
                        text-richblack-800 bg-yellow-50'>
                        Add Member
                  </div>
                  <div onClick={()=>{
                      if(user?._id !== team?.lead?._id){
                            toast.error("Only team lead can create task")
                            return 
                      }
                      setTaskFlag(!taskFlag)}}
                      className='px-4 cursor-pointer py-2 w-fit font-medium rounded-md text-[16px]
                      text-richblack-800 bg-yellow-50'>
                      Create Task
                  </div>
              </div>

              
          </div> 

          {/* show tasks */}
          <div className='flex flex-col justify-between items-center mt-6 w-[90%] mx-auto xl:w-[800px]'>
            {
                team?.tasks?.length >0 ?
                    <div className='w-full'>
                         {
                          team?.tasks?.map((task,i)=>{
                            return <div key={i} className='flex w-full items-center justify-between py-4'>
                              <div className='text-richblack-5 uppercase text-xl font-medium'>{task?.title}</div>
                              <ProgressBar 
                                className='w-[50%] xl:w-[400px]'
                                completed={task?.progressPercentage}
                              />
                            </div>
                          })
                         }
                        
                    </div> :
                    <div className='text-4xl text-richblack-5 mt-4 text-center'>
                      Dont have any task
                    </div>
              }
          </div>

          {
            addMemberFlag ? <div className='absolute flex items-center justify-center
                                            inset-0 bg-transparent backdrop-blur-sm'>
                                 <form onSubmit={addMemberHandler}
                                   className='text-richblack-5 relative w-[90%] md:w-[500px]'>
                                   <div onClick={()=>setAddMemberFlag(!addMemberFlag)}
                                        className='absolute right-0 -top-4 text-xl font-bold'><IoMdClose/></div>
                                   <label> 
                                    <p className='text-richblack-5 text-xl pb-4'>Enter the Email of user</p>
                                    <input
                                      placeholder='Enter the email'
                                      name='email'
                                      value={email}
                                      onChange={(e)=>setEmail(e.target.value)}
                                      className='text-richblack-5 px-2 py-2 rounded-md bg-richblack-600 w-full'
                                      style={{
                                          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                      }}
                                    />
                                   </label>
                                   <button type='submit' 
                                           className='mt-4 text-richblack-900 w-full py-2 rounded-md bg-yellow-50'>Add member to team</button>
                                 </form>
                         </div> : 
                          <div className='absolute w-0'> </div>
          }

          {
            taskFlag ? <div className='absolute flex items-center justify-center
                                        inset-0 bg-transparent backdrop-blur-sm'>
                                 <form onSubmit={addTaskHandler}
                                   className='text-richblack-5 relative w-[90%] md:w-[500px]'>
                                   <div onClick={()=>setTaskFlag(!taskFlag)}
                                        className='absolute right-0 -top-4 text-xl font-bold'><IoMdClose/></div>
                                   <label> 
                                    <p className='text-richblack-5 text-xl pb-4'>Enter the task</p>
                                    <input
                                      placeholder='Enter the task'
                                      name='addTask'
                                      value={addTask}
                                      onChange={(e)=>setAddTask(e.target.value)}
                                      className='text-richblack-5 px-2 py-2 rounded-md bg-richblack-600 w-full'
                                      style={{
                                          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                      }}
                                    />
                                   </label>

                                   <input
                                      type='date'
                                      name='tdate'
                                      value={tdate}
                                      onChange={(e)=>setDate(e.target.value)}
                                      className='text-richblack-5 mt-4 px-2 py-2 rounded-md 
                                                 bg-richblack-600 w-full'
                                      style={{
                                          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                      }}
                                      
                                    />
                                   <button type='submit' 
                                           className='mt-4 text-richblack-900 w-full py-2 
                                           rounded-md bg-yellow-50'>Create task</button>
                                 </form>
                         </div> : 
                          <div className='absolute w-0'> </div>
          }

    </div>
  )
}
