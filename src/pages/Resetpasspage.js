import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux'
import { apiConnector } from '../servicess/apiConnector';
import { authEndpoint } from '../servicess/apis';
import { useNavigate } from 'react-router-dom';
import ColorText from '../components/commen/ColorText';

export default function Resetpasspage() {

    const navigate = useNavigate();
    const {resetEmail:email} = useSelector((state)=>state.auth);
    const [resetData,setResetData] = useState({
                                             otp:'',
                                             password:'',
                                             confirmPassword:''
                                            });

    const {otp,password,confirmPassword} = resetData

    function changeHandler(e){
        setResetData((data)=>({
            ...data,
            [e.target.name]:e.target.value
        }))
    }
    async function submitHandler(e){
        e.preventDefault();
        
        if(password !== confirmPassword){
            toast.error("Password and confirm password not match");
            return;
        }
        const loading = toast.loading("Resetting password....")
        try{
            const res = await apiConnector("POST",authEndpoint.RESET_PASSWORD_API,{email,otp,password});

            toast.success("Password reset successfully");
            console.log("res of the reset pass -->",res);
            navigate("/login")
        }catch(error){
            toast.error(error?.response?.data?.message);
            console.log("error in the reset pass api -->",error);
        }

        toast.dismiss(loading);
    }
  return (
    <div className='w-full h-[100vh] flex items-center gap-y-4 justify-center'>
        <form onSubmit={submitHandler}
           className='md:w-[500px] flex flex-col gap-y-4 w-[90%]'>
           <p  onClick={()=>navigate(-1)}
                    className='py-2 w-fit px-4 bg-yellow-50 text-richblack-900 font-medium
                             rounded-md'>{`< Back`} </p>
           <p className='text-4xl font-medium'>
            <ColorText  
                text={`You are one step close, please enter the neccessory info and you get your account back`}/>
           </p>
          <label>
            <p className='text-richblack-200 font-medium'>Enter the otp which we sent on {email}</p>
            <input
                placeholder='Enter the otp'
                value={otp}
                name='otp'
                onChange={changeHandler}
                className='text-richblack-5 px-2 py-2 rounded-md bg-richblack-600 w-full'
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
            />
          </label>

          <label>
            <p className='text-richblack-200 font-medium'>Enter the password</p>
            <input
                placeholder='Enter the password'
                value={password}
                name='password'
                onChange={changeHandler}
                className='text-richblack-5 px-2 py-2 rounded-md bg-richblack-600 w-full'
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
            />
          </label>
          <label>
            <p className='text-richblack-200 font-medium'>Enter the confirm password</p>
            <input
                placeholder='Enter the confirm password'
                value={confirmPassword}
                name='confirmPassword'
                onChange={changeHandler}
                className='text-richblack-5 px-2 py-2 rounded-md bg-richblack-600 w-full'
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
            />
          </label>
           
           <button type='submit' className='py-2 w-full bg-yellow-50 text-richblack-900 font-medium
                             rounded-md' >Change password</button>

        </form>
    </div>
  )
}
