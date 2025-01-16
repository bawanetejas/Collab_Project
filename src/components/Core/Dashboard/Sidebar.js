import React from 'react'
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom'
import { TbLogout2 } from "react-icons/tb";
import { useSelector } from 'react-redux';
export default function Sidebar() {

  const navigate = useNavigate()
  const location = useLocation();

  const {user} = useSelector((state)=>state.auth)
  function matchRoute(route){
    
    return matchPath({path:route},location.pathname)
  }

  function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/")
  }
  return (
    <div className=' w-[250px] flex flex-col bg-richblack-800 border-r-[1px] h-[100vh]'>
      <div  className='px-6 py-2 w-full flex items-center gap-2 border-l-richblack-800 border-l-4'>
        <img src={user?.image} className='w-[40px] h-[40px] rounded-full'/>
        <div className='font-medium text-xl uppercase text-blue-300'>
          {user?.firstName}
        </div>
      </div>
      <Link to={"/dashboard/profile"} 
       className={`${matchRoute("/dashboard/profile") ?
        "bg-yellow-5 bg-opacity-25  border-l-yellow-100":
        "border-l-richblack-800"} px-6 border-l-4  text-xl py-2 w-full`}>Profile</Link>
      <Link to={"/dashboard/my-project"} 
      className={`${matchRoute("/dashboard/my-project") ? 
      "bg-yellow-5 bg-opacity-25 border-l-4 border-l-yellow-100":
      "border-l-richblack-800 "} border-l-4  text-xl px-6 py-2 w-full`}>My project</Link>
      <Link to={"/dashboard/teams"} 
      className={`${matchRoute("/dashboard/teams") ? 
      "bg-yellow-5 bg-opacity-25 border-l-4 border-l-yellow-100":
      "border-l-richblack-800"}  text-xl px-6 py-2 border-l-4  w-full`}>Team</Link>

    <Link to={"/dashboard/setting"} 
      className={`${matchRoute("/dashboard/setting") ? 
      "bg-yellow-5 bg-opacity-25 border-l-4 border-l-yellow-100":
      "border-l-richblack-800"}  text-xl px-6 py-2 border-l-4  w-full`}>Setting</Link>

      <div className='w-full h-[1px] my-3 bg-richblack-200'> </div>
      <div onClick={logout}
      className='flex flex-row text-xl text-pink-400 cursor-pointer gap-2 items-center border-l-richblack-800  px-6 py-2 border-l-4  w-full'>
        <TbLogout2/>
        <p className='text-xl text-pink-400'>Logout</p>
      </div>
    </div>
  )
}
