import React, { useState } from 'react'
import { apiConnector } from '../servicess/apiConnector';

import {authEndpoint}  from "../servicess/apis"
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setResetEmail } from '../redux/slicess/authSlice';

export default function VerifyEmail() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email,setEmail]=useState('');

    async function submitHandler(e){
        e.preventDefault();
        const loading = toast.loading("Sending otp...")
       try{ 
            const res = await apiConnector("POST",authEndpoint.VERIFY_EMAIL_OTP_API,({email}));
        
            dispatch(setResetEmail(email));
            toast.success("otp sent")
            navigate("/reset-password")
        }catch(error){
            toast.error("Otp not sent")
            // console.log("verify email error -->",error);
        }

        toast.dismiss(loading);
    }
  return (
    <div className='w-full h-[100vh] relative flex items-center justify-center'>
        <form  onSubmit={submitHandler}
               className='w-[90%] flex flex-col gap-4 md:w-[500px] '>
            <p  onClick={()=>navigate(-1)}
                    className='py-2 cursor-pointer w-fit px-4 bg-yellow-50 text-richblack-900 font-medium
                             rounded-md'>{`< Back`} </p>
            <p className='text-pink-400 text-xl'>Enter Your Email so we send you an otp to Verify Email</p>
            <input
                placeholder='Enter Your Email'
                name='email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className='text-richblack-5 px-2 py-2 rounded-md bg-richblack-600 w-full'
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
            />
            <button className='py-2 w-full bg-yellow-50 text-richblack-900 font-medium
                             rounded-md'>Verify Email</button>
        </form>
    </div>
  )
}
