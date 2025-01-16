import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../servicess/auth';
import { useNavigate } from 'react-router-dom';

export default function Otp() {
    const navigate = useNavigate();
    const {signupData} = useSelector((state)=>state.auth);
    const [otp,setCode] = useState('');
    function handleChange(e){
        setCode(e.target.value);
    }

    const{
        firstName,lastName,email,password,confirmPassword
    }  = signupData

    function clickHandler(e){
        e.preventDefault();
        
        signup(firstName,lastName,email,password,confirmPassword,otp,navigate);
        
        // console.log("signup data from otp page --.>",signupData)
    }
  return (
    <div className='w-full h-[100vh] flex items-center justify-center'>
        <div className='w-[90%] md:w-[500px] flex flex-col gap-3 p-4 justify-center'>
            <p className='text-4xl font-bold text-richblack-5'>Verify Email</p>
            <p className='text-pink-400 font-serif text-md'>
                    Verification code has been sent to your Email, Enter the code below</p>

            <input
                type='text'
                placeholder='Enter code'
                value={otp}
                name='otp'
                onChange={handleChange}
                className='text-richblack-5 px-4 py-2 rounded-md bg-richblack-600 w-full'
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
            />

            <button onClick={clickHandler} className='w-full py-2 text-xl text-richblack-700
               bg-yellow-50 rounded-md '>Verify Email</button>
        </div>
    </div>
  )
}
