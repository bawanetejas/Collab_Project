import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Profile() {

  const {user}= useSelector((state)=>state.auth)

  const navigate = useNavigate()
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='text-white w-[90%] mx-auto xl:w-[800px] flex flex-col gap-y-8 absolute z-10 pb-10 '>
        <h1 className='text-[30px] font-semibold text-richblack-5'>My Profile</h1>

        {/* image sec */}
        <div className='flex justify-between items-center relative w-full bg-richblack-800 border-[1px] rounded-md border-richblack-700  p-[24px]'>
            <div className='flex md:flex-row flex-col items-start md:items-center gap-x-3'>
                <div className='aspect-square rounded-full w-[78px]'>
                    <img src={user?.image} className='w-full aspect-square rounded-full'  alt={`profile-${user.firstName}`}/>
                </div>
                <div className='flex flex-col gap-1'>
                    <p className='font-semibold text-[18px] text-richblack-5'>{user.firstName} {user.lastName}</p>
                    <p className='text-[14px] text-richblack-300 font-regular'>{user.email}</p>
                </div>
            </div>
            
        </div>

        {/* about set */}

        <div className='flex  flex-col gap-y-4 justify-between relative w-full bg-richblack-800 border-[1px] rounded-md border-richblack-700 p-[24px]'>
            <div className='flex justify-between items-center'>
                <p className='font-semibold text-[18px] text-richblack-5'>About</p>
                
            </div>
            <p
            className={`${
                user?.profile?.about ?"text-richblack-5":"text-richblack-400"
            } text-sm font-semibold`}
            >
                {
                    user?.profile?.about ?? "Write Something About Yourself"
                }
            </p>


        </div>
        {/* personal detail */}
        <div className='flex  flex-col gap-y-2 justify-between relative w-full bg-richblack-800 border-[1px] rounded-md border-richblack-700 p-[24px]'>
            <div className='flex w-full justify-between items-center '>
                <p>Personal Detail</p>
                
            </div>
            <div className='flex flex-col gap-y-2'>
                <div className='flex flex-row md:gap-y-2 items-center justify-between md:justify-start'>
                    <div className='flex flex-col gap-1 w-11/12 max-w-[40%]'>
                        <p className='text-richblack-600 font-regular text-[14px]'>First Name</p>
                        <p className='font-medium text-[14px] text-richblack-5'>{user?.firstName}</p>
                    </div>
                    <div className='flex flex-col gap-1 '>
                        <p className='text-richblack-600 font-regular text-[14px]'>Last Name</p>
                        <p className='font-medium text-[14px] text-richblack-5'>{user?.lastName}</p>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row gap-y-2 md:items-center justify-between md:justify-start'>
                    <div className='flex flex-col gap-1 w-11/12 max-w-[40%]'>
                        <p className='text-richblack-600 font-regular text-[14px]'>Email</p>
                        <p className='font-medium text-[14px] text-richblack-5'>{user?.email}</p>
                    </div>
                    <div className='flex flex-col gap-1 '>
                        <p className='text-richblack-600 font-regular text-[14px]'>Phone Number</p>
                        <p className='font-medium text-[14px] text-richblack-5'>{user?.profile?.contactNumber ?? "Add contact number"}</p>
                    </div>
                </div>
                <div className='flex flex-row gap-y-2 items-center justify-between md:justify-start'>
                    <div className='flex flex-col gap-1 w-11/12 max-w-[40%]'>
                        <p className='text-richblack-600 font-regular text-[14px]'>Gender</p>
                        <p className='font-medium text-[14px] text-richblack-5'>{user?.profile?.gender ?? "Add gender"}</p>
                    </div>
                    <div className='flex flex-col gap-1 '>
                        <p className='text-richblack-600 font-regular text-[14px]'>Date of Birth</p>
                        <p className='font-medium text-[14px] text-richblack-5'>{new Date(user?.profile?.dateOfBirth).toLocaleDateString()?? "Add Date of Birth"}</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
    </div>
  )
}
