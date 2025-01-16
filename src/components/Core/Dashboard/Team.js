import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { apiConnector } from '../../../servicess/apiConnector';
import toast from 'react-hot-toast';
import { teamEndpoints } from '../../../servicess/apis';
import { useNavigate } from 'react-router-dom';
import { getAllTeamData } from '../../../servicess/teams';
import { setUser } from '../../../redux/slicess/authSlice';
export default function Team() {

    // get all team related with the user 
    // how to byfergate what are the task of the mine ?
    // make a filter seeAll or only mine ===> by using the email or id i can make the filter

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [teamName,setTeamName]=useState("")
    const [modal,setModal]=useState(false);
    const {user,token}= useSelector((state)=>state.auth);

    const {CREATE_TEAM_API} =teamEndpoints
    async function addTeam(e){

      e.preventDefault();
      try{
        // console.log("token from team fe --->",CREATE_TEAM_API)
        const res = await apiConnector("POST",CREATE_TEAM_API,{name:teamName},
                                         { Authorization:`Bearer ${token}`}
                                        )

        console.log("res of the add team api -->",res);
        localStorage.setItem("user",JSON.stringify(res?.data?.data));
        dispatch(setUser(res?.data?.data))
        toast.success("Team added successfully")

      }catch(error){
        toast.error("Not able to create team")
      }
    }

    function clickHandler(){
      setModal(!modal);
    }

    function teamClick(data){
      getAllTeamData(data._id,token,dispatch);
      navigate(`/view-team/${data._id}`);
    }
  return (

    <div className='w-full absolute h-full overflow-auto'>
        <div className='w-[90%] xl:w-[800px] mx-auto pt-6  py-4 flex items-center justify-between'>
          <div className='text-3xl'>Team</div>
          <button onClick={clickHandler}
            className='flex items-center px-4 py-2
           bg-yellow-50 rounded-md text-richblack-800'><FaPlus/>  Add Team

           </button>
        </div>

        <div className='w-[90%] xl:w-[800px] px-10 mx-auto'>

          {
            user?.teams?.length > 0 ? <div className='flex flex-col gap-3'>
                {
                  user?.teams.map((team,i)=>{

                    return   <div  key={i}
                               onClick={()=>teamClick(team)}
                               className=' text-xl cursor-pointer'>
                            {team.name}
                      </div>
                  })
                }
            </div> : 
            <div className='text-3xl font-semibold w-full text-center'>
                  Don't have any team
            </div>
          }
           

        </div>

        {
          modal ? <div className='w-full inset-0 fixed flex items-center  bg-transparent backdrop-blur-sm'>

                        <form onSubmit={addTeam} className='w-[90%] mx-auto p-8 relative md:w-[400px] text-richblack-900'>
                         <div className='absolute text-white right-0 cursor-pointer' onClick={clickHandler}>close</div>
                        <label>
                              <p className='text-md font-sans text-richblack-5 '>
                                        Enter Team Name<sup className='text-[red]'>*</sup></p>
                              <input
                                  type='text'
                                  placeholder='Enter your team name'
                                  name='teamName'
                                  value={teamName}
                                  onChange={(e)=>setTeamName(e.target.value)}
                                  className='text-richblack-5 px-2 py-2 rounded-md bg-richblack-600 w-full'
                                  style={{
                                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                  }}

                              />
                          </label>
                            <button type='submit' className='px-4 py-2 w-full mt-4
                                bg-yellow-50 rounded-md text-richblack-800'>Add Team

                            </button>
                        </form>
          </div> 
          :<div className='w-0'></div>
        }

    </div>
  )
}
