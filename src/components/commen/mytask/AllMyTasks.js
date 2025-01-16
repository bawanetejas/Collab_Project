
import React from 'react'

export default function AllMyTasks() {
  return (
    <div className='w-full relative h-full'> 

       <div className='md:w-[800px] w-[90%]'>

            <div className='flex items-center justify-between w-full'>
                <div>My Task</div>
                <button   className='px-4 cursor-pointer py-2 w-fit rounded-md text-[16px]
                        text-richblack-800 bg-yellow-50'> Create Task</button>
            </div>
         
       </div>
       

    </div>
  )
}
