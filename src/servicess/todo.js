import toast from "react-hot-toast";
import { apiConnector } from "./apiConnector";
import { todoEndpoint } from "./apis";


const {CREATE_TODO_API,DELETE_TODO_API,MARK_TODO_COMPLETE_API} = todoEndpoint;

export async function createTodo(title,description,dueDate,assigniId,taskId,token){

    const toastId = toast.loading("Loading...")

    try{
        const res = await apiConnector("POST",CREATE_TODO_API,{title,description,dueDate,assigniId,taskId},
                                                            {
                                                                Authorization:`Bearer ${token}`
                                                            }
        );

        toast.success("Todo created successfully")
        // console.log("res of create todo --->",res);
    }catch(error){
        toast.error("Error while creating the todo")
        // console.log("error in the create-todo -->",error);
    }

    toast.dismiss(toastId)
}

export async function todoDelete(taskId,todoId,token){

    const toastId = toast.loading("Loading....")

    // console.log("res of the delete todo api -->",DELETE_TODO_API);
    try{

        const res = await apiConnector("DELETE",DELETE_TODO_API,{taskId,todoId},{
                                                    Authorization:`Bearer ${token}`
                                        });

        toast.success("Todo deleted successfully");

        // console.log("res of the delete todo api -->",res);

    }catch(error){
        toast.error("Not able to delete todo")
        // console.log("error while deleting the todo --->",error)
    }

    toast.dismiss(toastId);
}

export async function completeTodo (taskId,todoId){

    const toastId = toast.loading("Loading...")

    try{

        const res = await apiConnector("POST",MARK_TODO_COMPLETE_API,{taskId,todoId});

        // console.log("res of the mark todo api --->",res);
        toast.success("Marked completed");

    }catch(error){
        toast.error("Not able to mark todo")
        // console.log("Not able to mark todo as completed");
    }
    toast.dismiss(toastId)
}


// ************************** MY TASK work*****************************//

