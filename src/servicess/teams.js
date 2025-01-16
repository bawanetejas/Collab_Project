import toast from "react-hot-toast";
import { apiConnector } from "./apiConnector";

import {teamEndpoints} from "./apis"
import { setTeam } from "../redux/slicess/teamSlice";

const {GET_ALL_TEAM_DATA,CREATE_TEAM_API,ADD_MEMBER_API} =teamEndpoints;

export async function getAllTeamData(id,token,dispatch){

    const toastId = toast.loading("Loading...")
    try{

        const res = await apiConnector("POST",GET_ALL_TEAM_DATA,{id:id},
            {Authorization:`Bearer ${token}`}
        );

        // console.log("Response of the get all team data -->",res);

        dispatch(setTeam(res?.data?.data));
        // toast.success("Data fetched successfully");

    }catch(error){

        toast.error("Not able to get data")
        // console.log("Error in the getAllTeamData api -->",error)
    }

    toast.dismiss(toastId)
}

export async function addMemberToTeam(teamId,email,token){
    const toastId = toast.loading("Loading...");
    try{

        const res = await apiConnector("POST",ADD_MEMBER_API,{teamId,email},
                                         {
                                            Authorization:`Bearer ${token}`
                                         }
        );

        // console.log("response of the add Member api -->",res)

        toast.success("member added successfully")
    }catch(error){
        // console.log("error in the addMember api -->",error);
        toast.error(error?.response?.data?.message);
    }

    toast.dismiss(toastId);
}

