import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { getAllTaskDetail } from '../../../servicess/task';
import toast from 'react-hot-toast';
import { MdArrowBackIosNew } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { createTodo } from '../../../servicess/todo';
import ShowTodo from './ShowTodo';

export default function ViewTodos() {
  
  const navigate = useNavigate();
  const{taskId,teamId} =useParams();

  const {token,user}=useSelector((state)=>state.auth);
  const {team} = useSelector((state)=>state.team);
  const {task,myTodos} = useSelector((state)=>state.task);

  const [todoFlag,setTodoFlag] = useState(true);
 
  // view flag
  const [viewAllTodoFlag,setViewAllTodoFlag] = useState(true);
  
  const [todoData,setTodoData] = useState({
    title:'',
    discription:'',
    dueDate:'',
    assigni:''
  });
  const {title,discription,dueDate,assigni} = todoData
  const dispatch = useDispatch();

  function setData(e){
    setTodoData((data)=>({
      ...data,
      [e.target.name]:e.target.value
    }))
  }
  async function getData(){
    await getAllTaskDetail(taskId,token,dispatch,user._id)
    // const mtask = task?.todos?.filter((todo)=> todo?.member?._id === user._id);
    // setMyTask(mtask)
  }
  useEffect(()=>{
    
    getData()
    setTodoFlag(false)
  },[teamId,taskId])

  // view todo handler
  

  async function submitHandler(e){
    e.preventDefault()
    console.log("form data -->",todoData)
    await createTodo(title,discription,dueDate,assigni,taskId,token);
    getAllTaskDetail(taskId,token,dispatch)
    setTodoFlag(false)
  }
  return (
    <div className='relative w-full min-h-[100vh] overflow-y-auto'>
        <div className='w-[90%] xl:w-[800px] min-h-full  mx-auto pt-8'>
            <div  onClick={()=>navigate(`/view-team/${teamId}`)}
                  className='py-2 px-4 rounded-md bg-yellow-50 
                           text-richblack-800 font-medium flex 
                           items-center gap-2 w-fit'> <MdArrowBackIosNew/> Back

            </div>
            <div className='w-full flex  items-center justify-between  py-2'>
              <div className='text-3xl text-richblack-5 uppercase'>{task.title}</div>
              <button onClick={()=>{
                if(user._id !== team.lead._id){
                    toast.error("Only lead can create todos")
                    return;
                }
                setTodoFlag(!todoFlag);
                console.log(todoFlag)
              }}
                  className='py-2 px-4 rounded-md bg-yellow-50 text-richblack-800 font-medium'  >Create Todo</button>
            </div>

            {/* filter div */}
            <div  
            className='flex flex-row gap-4 bg-richblack-800 p-[5px] rounded-full w-fit mt-[36px] font-medium' >
             <button onClick={()=>{setViewAllTodoFlag(true)}} className={`${viewAllTodoFlag === true ?"bg-richblack-900 text-richblack-5":"text-richblack-200"}
                     py-[6px] px-[18px] rounded-full`}>All Todo</button>
             <button onClick={()=>{setViewAllTodoFlag(false)}} className={`${viewAllTodoFlag === false ?"bg-richblack-900 text-richblack-5":"text-richblack-200"}
               py-[6px] px-[18px] rounded-full`}> My Todo </button>
          </div>

            {/* todo showing */}

            <div>
              {
                viewAllTodoFlag ? ( task?.todos?.length > 0 ? task?.todos?.map((todo,ind)=>{
                              return <div key={ind}>
                                    <ShowTodo todo={todo}  />
                                    
                              </div>
                            }) : <div className='text-5xl relative top-8 mt-10 
                            text-center font-medium '> Dont have any work yet</div>) :
                            ( myTodos?.length > 0 ? myTodos.map((todo,ind)=>{
                              return <div key={ind}>
                                    <ShowTodo todo={todo} />
                                    
                              </div>
                            }) : <div className='text-5xl relative top-8 mt-10 
                            text-center font-medium '> Dont have any work yet</div>)
              }
            </div>



        </div>


    {/* Create Todo */}
        {

          todoFlag ? <div className='w-full absolute  flex text-white items-center justify-center
                                 inset-0 bg-transparent backdrop-blur-sm h-[100vh]'>

                            <form onSubmit={submitHandler}
                                  className='relative flex flex-col gap-4 w-[500px] border-[1px] border-richblack-200 rounded-md p-4'>
                              <div  className='absolute text-3xl -top-7 -right-4'
                              onClick={()=>setTodoFlag(!todoFlag)}><IoMdClose/></div>
                              <label>
                                {/* title */}
                                <p className='LabelClass'>Title</p>
                                <input
                                  type='text'
                                  placeholder='Enter title'
                                  name='title'
                                  value={title}
                                  onChange={setData}
                                  className='text-richblack-5 px-2 py-2 rounded-md bg-richblack-700 w-full'
                                  style={{
                                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                  }}
                                />
                              </label>
                              <label>
                                {/* title */}
                                <p className='LabelClass'>Description</p>
                                <input
                                  type='text'
                                  placeholder='Enter description'
                                  name='discription'
                                  value={discription}
                                  onChange={setData}
                                  className='text-richblack-5 px-2 py-2 rounded-md bg-richblack-700 w-full'
                                  style={{
                                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                  }}
                                />
                              </label>
                              <label className='flex w-full  items-center'>
                                {/* title */}
                                <p className='LabelClass w-[30%]'>Due Date</p>
                                <input
                                  type='date'
                                  placeholder='Enter Date'
                                  name='dueDate'
                                  value={dueDate}
                                  onChange={setData}
                                  className='text-richblack-5 px-2 py-2 rounded-md bg-richblack-700 w-full'
                                  style={{
                                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                  }}
                                />
                              </label>
                              <label className=' flex w-full '>
                                {/* title */}
                                <p className='LabelClass flex items-baseline w-[30%]'>Assigne to</p>
                                <select onChange={setData}
                                  className='text-richblack-5 px-2 py-2 rounded-md bg-richblack-700 w-full'
                                  style={{
                                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                  }}
                                 name='assigni'>
                                    <option value={''}>Select</option>
                                  { 
                                    
                                    team?.member?.map((user)=>{
                                      return <option 
                                                value={user?._id}>{user?.firstName} {user.lastName}

                                              </option>
                                    })
                                  }
                                </select>
                              </label>
                              <button type='submit'
                                      className='py-2 px-4 rounded-md bg-yellow-50 
                                      text-richblack-800 font-medium'>
                                       Create todo
                              </button>
                            </form>   
                    </div> :
                     <div className='w-0 absolute'></div>

        }

        
    </div>
  )
}
