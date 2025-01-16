import React from 'react'
import { MdDelete } from "react-icons/md";
import { completeTodo, todoDelete } from '../../../servicess/todo';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getAllTaskDetail, getMyTaskDetail } from '../../../servicess/task';

export default function ShowTodo({todo,setTask}) {


    const {token,user} = useSelector((state)=>state.auth);
    const {taskId} = useParams()
    const dispatch = useDispatch()
    async function deleteTodo(){
        await todoDelete(taskId,todo?._id,token)
        getAllTaskDetail(taskId,token,dispatch,user._id);
        getMyTaskDetail(taskId,dispatch)
    }

    async function markTodoCompleted(){

        if(todo?.member?._id !== user?._id){

            toast.error("Only assigned user can mark it as completed")
            return 
        }
        // //taskId ,, todoId ,, 
        await completeTodo(taskId,todo?._id);
        getAllTaskDetail(taskId,token,dispatch,user._id);
        getMyTaskDetail(taskId,dispatch)
    }

  return (
    <div className='w-full relative flex gap-4 items-center border-b-[1px] py-4 border-richblack-500'>
        <input
            type='checkbox'
            checked={todo?.complete}
            onClick={markTodoCompleted}
            className='Checkbox w-4 h-4 border-[1px] '
        />
        <div className='text-richblack-200'>
            <div className='text-xl uppercase text-richblack-50'>{todo?.title}</div>
            <div>{todo?.description}</div>
            <div className='flex gap-x-8 items-center'>
                <div>Due Date : {todo?.dueDate}</div>
                <div>Assigne To : {todo?.member?.firstName} {todo?.member?.lastName}</div>
            </div>
            
        </div>
        <div  onClick={deleteTodo}
              className='absolute cursor-pointer right-6 '>
              <MdDelete className='font-bold text-2xl'/>
        </div>
        
    </div>
  )
}
