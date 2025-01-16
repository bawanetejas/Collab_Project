
import React, { useEffect } from 'react'
import ViewTaskSidebar from '../components/commen/viewtask/ViewTaskSidebar'
import { Outlet, useParams } from 'react-router-dom'
import { getAllTeamData } from '../servicess/teams'
import { useDispatch, useSelector } from 'react-redux'

export default function ViewTasks() {

  const {token} = useSelector((state)=>state.auth);
  const {teamId} = useParams();
  const dispatch = useDispatch();
  useEffect(()=>{
    getAllTeamData(teamId,token,dispatch)
  },[])
  return (
    <div className='w-full flex flex-row  h-[100vh] relative text-white'>
        
            <ViewTaskSidebar/>
            <div className='flex w-full flex-1  relative'>
                <div className='w-full relative h-full overflow-auto'>
                    <Outlet/>
                </div>
            </div>
    </div>
  )
}
