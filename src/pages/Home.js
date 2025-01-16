import React from 'react'
import {Link} from "react-router-dom"
import homepic from "../photo/teamwork.webp"
import heroimg from "../photo/heroimg.jpg"
import Footer from '../components/commen/Footer'
export default function Home() {
  return (
    <div className='w-full min-h-[100vh] overflow-x-hidden'>

              {/*  ............NavBar.......... */}

             <div className='w-full overflow-x-hidden flex justify-between fixed top-0 bg-richblack-800 text-richblack-5
                             border-b-[1px] border-richblack-700 font-serif px-4 py-2 items-center h-fit'>
                <p>Collab</p>
                <div className='flex gap-2'>
                    <Link className='py-2 px-4 text-richblack-100 border-[1px] border-richblack-400 rounded-md  text-[16px]' to={"/login"}>Login</Link>
                    <Link className='py-2 px-4 text-richblack-100 border-[1px] border-richblack-400 rounded-md   text-[16px]' to={"/sign-up"}>Sign up</Link>
                </div>      
            </div>

            {/* ********hero section********* */}

            <div className='w-[90%] pb-6 mx-auto flex flex-col items-center gap-4 overflow-x-hidden xl:w-[1200px] pt-[8rem]'>
              <div className='w-[90%] xl:w-[1000px] text-xl font-serif md:text-3xl text-center text-blue-400 font-medium'>
                  Being organized involves creating a clear, structured, and efficient system to manage tasks,
                  priorities, and responsibilities, enabling smoother execution and achieving goals with 
                  greater ease and precision.
              </div>
              <img src={heroimg} className='w-[90%] md:w-[1000px] md:h-[500px]'/>

            </div>


            {/* .............middle section...............*/}


            <div className='text-2xl py-6 md:w-[800px] mx-auto sm:text-4xl font-medium
             text-blue-200 text-center'>" You can collaborate as a team to work on same project "</div>

            <div className='flex flex-col py-6 overflow-x-hidden mx-auto md:flex-row items-center gap-4 w-[90%] xl:w-[1200px] '>
                <p className=' text-xl font-medium text-left tracking-wider  text-richblack-25 w-[90%] md:w-full'>
                    Collaboration is the process of working together with others to achieve a common goal. 
                    By leveraging diverse skills, perspectives, and efforts, collaboration fosters 
                    innovation and drives better outcomes for all involved. It is a cornerstone of
                    success in both personal and professional endeavors, highlighting the importance of 
                    teamwork, communication, and mutual respect.
                </p>
                <img src={homepic} className='w-[90%] md:w-[500px] '/>
            </div>

            <Footer/>
    </div>
  )
}
