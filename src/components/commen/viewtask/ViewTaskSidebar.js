import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

export default function ViewTaskSidebar() {

  const {team} = useSelector((state)=>state.team)
  const {teamId} = useParams();
  const navigate = useNavigate();
  function taskClick(task){
          
          navigate(`/view-team/${teamId}/task/${task._id}`);
      
  }

  return (
    <div className='w-[200px] md:w-[300px] border-r-[1px] h-[100vh]'>
        <div className='text-2xl font-medium pt-8 text-richblack-25 py-2 px-4'>
           {team?.name}
        </div>

        {
          team?.tasks?.length > 0 ?
           <div className='w-full py-1 px-4 flex  flex-col gap-y-4'> 
              {
                  team?.tasks.map((task,i)=>{
                    return <div key={i}>
                          <p onClick={()=>taskClick(task)}
                            className='text-[18px] hover:text-blue-200 uppercase cursor-pointer text-richblack-100'>
                            {task.title}
                          </p>
                    </div> 
                  })

              }
           </div> : 
           <div className='text-xl px-4 font-medium text-richblack-25'> Create Task</div>
        }
    </div>
  )
} 
