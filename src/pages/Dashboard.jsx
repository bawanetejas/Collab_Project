import React from 'react'
import Sidebar from '../components/Core/Dashboard/Sidebar'
import { Outlet } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div>
        <div className='text-white flex flex-row w-full h-full relative'>
            <Sidebar/>
            <div className='w-[70%] relative flex flex-1'>
              <div className='w-full relative  overflow-y-auto'>
                <Outlet/>
              </div>
            </div>
        </div>
    </div>
  )
}
