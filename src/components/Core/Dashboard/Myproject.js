import React, { useEffect, useState } from 'react'
import ProgressBar from "@ramonak/react-progress-bar";
import { useDispatch, useSelector } from 'react-redux';
import { IoMdClose } from "react-icons/io";
import { createMYTask, getAllMYTask } from '../../../servicess/task';
import { Navigate, useNavigate } from 'react-router-dom';
export default function Myproject() {


  // get all task in array related to user
  // make the name of it visible
  // onclick show all todos in other page
  // dashboard/my-project/task/todos   task = taskId and todos=todoId for 

  const {user,token} = useSelector((state)=>state.auth);
   
  const [addTask,setAddTask] = useState('');
  const [tdate,setDate] = useState('');
  const [taskFlag,setTaskFlag] = useState(false);

  const [allTask,setAllTask] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
         getAllMYTask(token,setAllTask)
  },[]);
  async  function addTaskHandler(e){
          e.preventDefault();

          console.log("data from my task page-->",addTask,tdate)
          await createMYTask(addTask,tdate,token);
          getAllMYTask(token,setAllTask)

          // i have to use it in other component so i need to make it available for all
          setTaskFlag(false);
  }
  return (
    <div className='w-full relative min-h-[100vh] overflow-y-auto'> 

        <div className='xl:w-[800px] w-[90%] mx-auto relative  py-10 overflow-y-auto'>

            <div className='flex items-center justify-between w-full'>
                <div className='text-2xl font-medium text-richblack-5'>My Task</div>
                <button   onClick={()=>setTaskFlag(!taskFlag)}
                        className='px-4 cursor-pointer font-bold  py-2 w-fit rounded-md text-[16px]
                        text-richblack-800 bg-yellow-50'> Create Task</button>
            </div>

          {/* all tasks */}

            <div className='relative pt-10' >
              {
                allTask?.length>0 ? <div className='flex flex-col gap-3'>
                  {
                    allTask?.map((task)=>{
                     return  <div className='flex items-center justify-between'>
                             <div onClick={()=>navigate(`/dashboard/my-project/${task._id}`)}
                             className='uppercase hover:text-blue-300 text-2xl text-richblack-100 cursor-pointer'>{task.title}</div>
                             <ProgressBar
                              className='w-[50%] xl:w-[400px]'
                              completed={task?.progress}
                             />
                     </div>
                    }) 
                  }
                </div> :<div className='text-3xl text-center font-bold'>You Dont have any work </div>
              }
            </div>
          
        </div>

        {

          taskFlag ? <div className='absolute flex items-center justify-center inset-0 bg-transparent backdrop-blur-sm'>


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
                            

          </div> : <div className='w-0 opacity-0 h-0'></div>
        }
    
    </div>
  )
}
