import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { BiSolidEdit } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { changePassword, updateProfile } from '../../../servicess/profile';
import toast from 'react-hot-toast';

export default function Setting() {

  const {user,token}=useSelector((state)=>state.auth)

  const [profileflag,setProfileFlag] = useState(false)

  const [profileData,setProfileData] = useState({
    about:"",contact:"",dob:"",gender:"",pass:"",cpass:""
  });

  // const [password,setPassword]=useState({pass:"",cpass:""});

  const {about,contact,dob,gender,pass,cpass} = profileData;

  function submitHandler(e){
    e.preventDefault();
    
    updateProfile(dob,contact,about,gender,user.profile._id)
    
  }

  function passwordChange(){
     if(cpass.length ===0 || pass.length ===0){
      toast.error("All fields required")
      return ;
     }
     if(cpass !== pass){
      toast.error("password and confirm password not same")
      return ;
     }

     changePassword(pass,token);
  }
  function changeHandler(e){
    
    setProfileData((data)=>({
      ...data,
      [e.target.name]:e.target.value
    }))
  }
  return (
    <div className='w-full h-full absolute overflow-x-hidden'>
      <div className='w-[90%] xl:w-[800px] mx-auto py-4'>

            {/* Heading */}
            <h1 className='text-3xl font-bold text-richblack-50 pt-[3rem] pb-6'>Setting</h1>
   
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


        {/* personal detail */}
        <div className='flex relative my-6 flex-col gap-y-2 justify-between  w-full bg-richblack-800 border-[1px] rounded-md border-richblack-700 p-[24px]'>
            <div className='flex w-full justify-between items-center '>
                <p>Personal Detail</p>
                <BiSolidEdit onClick={()=>setProfileFlag(!profileflag)} className='absolute right-6 top-2 font-medium text-2xl text-yellow-50' />
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
                        <p className='font-medium text-[14px] text-richblack-5'>{new Date(user?.profile?.dateOfBirth).toLocaleDateString() ?? "Add Date of Birth"}</p>
                    </div>
                </div>
            </div>
        </div>

        {/* change password */}
        <div className='w-full flex flex-col justify-center items-center bg-richblack-800 border-[1px] rounded-md border-richblack-700  p-[24px]'>
            <p className='text-blue-500 font-medium text-2xl'>Wann to change password</p>
            <div className='flex w-full flex-1 sm:flex-row sm:jb gap-4 flex-col '>
                    <label className='w-full'>
                        <p className='font-medium text-pink-400'>Enter new password</p>
                        <input
                          placeholder='Enter about yourself'
                          name='pass'
                          value={pass}
                          onChange={changeHandler}
                          className='text-richblack-5 px-2 py-2 rounded-md bg-richblack-600 w-full'
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                        />
                    </label>

                    <label className='w-full'>
                        <p className='font-medium text-pink-400'>Confirm password</p>
                        <input
                          placeholder='Enter about yourself'
                          name='cpass'
                          value={cpass}
                          onChange={changeHandler}
                          className='text-richblack-5 px-2 py-2 rounded-md bg-richblack-600 w-full'
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                        />
                    </label>

            </div>
            <button  onClick={passwordChange}
             className='w-[70%] mx-auto justify-self-center my-4 text-bold bg-yellow-50 text-richblack-900
                     rounded-md py-2 text-xl'>Change pass</button>
        </div>
        

      </div>


      {
        profileflag ? <div className='absolute inset-0 backdrop-blur-md flex items-center justify-center h-full w-full'>
              <form onSubmit={submitHandler}
                className='md:w-[500px] w-[90%] relative flex flex-col gap-y-4'>

                <RxCross2 onClick={()=>setProfileFlag(!profileflag)} className='font-medium absolute text-xl right-1 -top-4' />
                 {/* about */}

                 <label>
                    <p className='font-medium text-richblack-100'>About</p>
                    <input
                      placeholder='Enter about yourself'
                      name='about'
                      value={about}
                      onChange={changeHandler}
                      className='text-richblack-5 px-2 py-2 rounded-md bg-richblack-600 w-full'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                    />
                 </label>

                 {/* gender */}

                 <label>
                    <p className='font-medium text-richblack-100'>Contact Number</p>
                    <input
                      placeholder='Enter about yourself'
                      name='contact'
                      value={contact}
                      onChange={changeHandler}
                      className='text-richblack-5 px-2 py-2 rounded-md bg-richblack-600 w-full'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                    />
                 </label>

                 {/* contact */}

                 <label>
                    <p className='font-medium text-richblack-100'>Gender</p>
                    <select 
                      name='gender'
                      onChange={changeHandler}

                      className='text-richblack-5 px-2 py-2 rounded-md bg-richblack-600 w-full'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}

                    >
                      <option>Select</option>
                      <option  value={"Male"}>Male</option>
                      <option value={"Female"}>Female</option>
                      <option value={"Other"}>Other</option>

                    </select>
                 </label>

                 {/* DOB */}

                 <label>
                    <p className='font-medium text-richblack-100'>Date of Birth</p>
                    <input
                      placeholder='Enter date of birth'
                      type='date'
                      name='dob'
                      value={dob}
                      onChange={changeHandler}
                      className='text-richblack-5 px-2 py-2 rounded-md bg-richblack-600 w-full'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                    />
                 </label>

                 <button type='submit' className='w-full text-bold bg-yellow-50 text-richblack-900
                  rounded-md py-2 text-xl'>Submit</button>

              </form>
        </div> :<div className='absolute hidden'></div>
      }

    </div>
  )
}
