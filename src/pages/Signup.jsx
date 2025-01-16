import React, { useState } from 'react'
import ColorText from '../components/commen/ColorText';
import { useDispatch, useSelector } from 'react-redux';
import { setSignupData } from '../redux/slicess/authSlice';
import { sendotp } from '../servicess/auth';
import { useNavigate } from 'react-router-dom';

export default function Signup() {

    const {signupData}= useSelector((state)=>state.auth)
    const navigate =useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:''
    });

    function changeHandler(e){
        setFormData((preData)=>({
            ...preData,
            [e.target.name] : e.target.value
        }));
    }
    

    function handleSubmit(e){

        e.preventDefault();
        // console.log(formData);
        sendotp(formData.email,formData.password,formData.confirmPassword,navigate);
        dispatch(setSignupData({...formData}));
        
        // console.log("sign up data --->",signupData)
    }
    const {firstName,lastName,email,password,confirmPassword}=formData;

  return (
    <div className='w-full h-[100vh] flex items-center justify-center'>
        <form onSubmit={handleSubmit} className='w-[90%] sm:w-[500px] flex flex-col gap-3 p-4'>

            <div className='text-pink-500 text-3xl font-bold'><ColorText text={"Welcome to Collab"}/>, where you can collaborate with your friends to achieve a Goal</div>
            <div className='flex flex-col sm:flex-row gap-2 sm:justify-between'>
                <label>
                    <p className='font-serif text-sm text-richblack-5'>First Name <sup className='text-pink-400'>*</sup></p>
                    <input
                        type='text'
                        placeholder='First Name'
                        onChange={changeHandler}
                        name='firstName'
                        value={firstName}
                        className='text-richblack-5 px-2 py-2 rounded-md bg-richblack-700 w-full'
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                    />
                </label>
                <label>
                    <p className='font-serif text-sm text-richblack-5'>Last Name <sup className='text-pink-400'>*</sup></p>
                    <input
                        type='text'
                        placeholder='Last Name'
                        onChange={changeHandler}
                        name='lastName'
                        value={lastName}
                        className='text-richblack-5 px-2 py-2 rounded-md bg-richblack-700 w-full'
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                    />
                </label>
            </div>

            <label>
                <p className='font-serif text-sm text-richblack-5'>Email <sup className='text-pink-400'>*</sup></p>
                <input
                    type='text'
                    placeholder='Enter Email'
                    onChange={changeHandler}
                    name='email'
                    value={email}
                    className='text-richblack-5 px-2 py-2 rounded-md bg-richblack-700 w-full'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                />
            </label>

            <label>
                <p className='font-serif text-sm text-richblack-5'>Password <sup className='text-pink-400'>*</sup></p>
                <input
                    type='text'
                    placeholder='Password'
                    onChange={changeHandler}
                    name='password'
                    value={password}
                    className='text-richblack-5 px-2 py-2 rounded-md bg-richblack-700 w-full'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                />
            </label>

            <label>
                <p className='font-serif text-sm text-richblack-5'>Confirm Password <sup className='text-pink-400'>*</sup></p>
                <input
                    type='text'
                    placeholder='Confirm Password'
                    onChange={changeHandler}
                    name='confirmPassword'
                    value={confirmPassword}
                    className='text-richblack-5 px-2 py-2 rounded-md bg-richblack-700 w-full'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                />
            </label>

            <button type='submit' className='w-full text-bold bg-yellow-50 text-richblack-900
             rounded-md py-2 text-xl'>Sign in</button>
        </form>
    </div>
  )
}
