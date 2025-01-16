import React, { useState } from 'react'
import { login } from '../servicess/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData,setFormData]=useState({
                                                email:"",
                                                password:""
                                            });
    
    function changeHandler(e){
            setFormData((preData)=>({
                ...preData,
                [e.target.name]:e.target.value
            }))
    }

    function submitHandler(e){
            e.preventDefault();
 
            login(formData.email,formData.password,navigate,dispatch)
            console.log(formData);
    }
  return (
    
    <div className='w-full h-[100vh] flex items-center justify-center'>
        <div className='sm:w-[500px] w-[90%] text-white p-4'>
            <p className='font-bold text-4xl font-sans text-center text-richblack-5'>Welcome Back</p>
            <p className='font-bold text-xl font-sans  text-center text-richblack-5 
                w-full mb-3'>Ready to collaborate with peers</p>
            <form onSubmit={submitHandler} className='flex flex-col gap-4 relative'>
                <label>
                    <p className='text-md font-sans text-richblack-5 '>
                               Enter your email<sup className='text-[red]'>*</sup></p>
                    <input
                        type='text'
                        placeholder='Enter your Email'
                        name='email'
                        value={formData.email}
                        onChange={changeHandler}
                        className='text-richblack-5 px-2 py-2 rounded-md bg-richblack-600 w-full'
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}

                    />
                </label>

                <label>
                    <p className='text-md font-sans text-richblack-5 '>
                      Enter your password<sup className='text-[red]'>*</sup></p>
                    <input
                        type='text'
                        placeholder='Enter your password'
                        name='password'
                        value={formData.password}
                        onChange={changeHandler}
                        className='text-richblack-5 px-2 py-2 rounded-md bg-richblack-600 w-full'
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                    />
                </label>

                <button type='submit' className='w-full py-2 bg-yellow-25 rounded-md
                    text-bold text-richblack-900'>Login</button>

                <p onClick={()=>navigate("/verify-email")}
                  className='text-md font-serif absolute cursor-pointer -bottom-6 right-0 text-pink-400'>Forgot password</p>
            </form>
        </div>
    </div>
  )
}
