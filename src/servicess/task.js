import toast from "react-hot-toast";

import { taskEndpoint } from "./apis";
import { apiConnector } from "./apiConnector";
import { setMyTask, setMyTodos, setTask } from "../redux/slicess/taskSlice";

    const {CREATE_TASK_API,
        GET_ALL_TASK_DATA_API,
        GET_ALL_MY_TASK_API,
        CREATE_MY_TASK_API,
        GET_MY_TASK_DETAIL_API}  = taskEndpoint
export async function createTask(teamId,title,dueDate,token){

    const toastId = toast.loading("Loading...")
    try{

        const res = await apiConnector("POST",CREATE_TASK_API,{teamId,title,dueDate},
                                         {
                                            Authorization:`Bearer ${token}`
                                         }
        );

        // console.log("response of the create task -->",res);
        toast.success("Task created successfully");


    }catch(error){
        toast.error(error?.response?.data?.message)
        // console.log("error in the create task api --->",error)
    }

    toast.dismiss(toastId)
}

export async function getAllTaskDetail(taskId,token,dispatch,id){
    const toastId = toast.loading("Loading...")

    try{
        const res = await apiConnector("POST",GET_ALL_TASK_DATA_API,{taskId},{
                                                        Authorization:`Bearer ${token}`    
                                                        });

        // console.log("res of the get task detail api -->",res);
        dispatch(setTask(res?.data?.data));
        const mtask = res?.data?.data?.todos?.filter((todo)=> todo?.member?._id === id);
        dispatch(setMyTodos(mtask))
        
        // toast.success("Data fetched")

    }catch(error){
        toast.error("Not able to fetch data")
        // console.log("error in the view-todo -->",error)
    }

    toast.dismiss(toastId);
}


//  ******************** my tasks work ****************************** //

export async function getAllMYTask(token,setAllTask){
    try{

        const res = await apiConnector("POST",GET_ALL_MY_TASK_API,null,{
                                                Authorization:`Bearer ${token}`
                                            });

        // console.log("res of the get all my-task-->",res);
        // toast.success("Data fetched")
        setAllTask(res?.data?.data);

    }catch(error){
        toast.error("Not able to get data")
        // console.log("ERROR in get my task detail api-->",error)
    }
}

// create my-task

export async function createMYTask(title,dueDate,token){
    const toastId = toast.loading("Loading...");

    try{

        const res = await apiConnector("POST",CREATE_MY_TASK_API,{title,dueDate},{
                                                Authorization:`Bearer ${token}`
                                        });

        // console.log("res of the create my task api -->",res);
        toast.success("Task created successfully");

    }catch(error){
        toast.error("Not able create task")
        // console.log("error in the my-task-creation api--->",error)
    }

    toast.dismiss(toastId)
}

// get my-task detail

export async function getMyTaskDetail(taskId,dispatch){

    try{

        const res = await apiConnector("POST",GET_MY_TASK_DETAIL_API,{taskId});

        console.log("res of the get my task detail api -->",res);
        dispatch(setMyTask(res?.data?.data));
        // toast.success("All data fetch successfully");

    }catch(error){
        toast.error("Not able to fetch data");
        // console.log("error while fetching my-task detail-->",error)
    }
}