import toast from "react-hot-toast";
import { apiConnector } from "./apiConnector";
import {profileEndpoint} from "../servicess/apis"

const {CHANGE_PASSWORD_API, UPDATE_PROFILE_API} =profileEndpoint
export async function changePassword (password,token){
    
    const loading = toast.loading("Loading..")
    try{
        const res = await apiConnector("POST",CHANGE_PASSWORD_API,{password},{
                                        Authorization:`Bearer ${token}`
        });

        console.log("res of the change password -->",res);
        toast.success("Password changed");
    }catch(error){
        toast.error("Not able to change password");
        console.log("Error while chnging the password -->",error)
    }
    toast.dismiss(loading);
}

export async function updateProfile(dob,contact,about,gender,id){
    const loading = toast.loading("Loading...");

    try{

        const res = await apiConnector("POST",UPDATE_PROFILE_API,{dob,contact,about,gender,id})

        toast.success("Profile updated successfully")
        console.log("res of update profile  -->",res);

    }catch(error){
        toast.error("Not able to update profile")
        console.log("Error while changing the profile -->",error)
    }

    toast.dismiss(loading);
}