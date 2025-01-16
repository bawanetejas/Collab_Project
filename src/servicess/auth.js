import toast from "react-hot-toast";
import { apiConnector } from "./apiConnector";
import { authEndpoint } from "./apis";
import { setToken, setUser } from "../redux/slicess/authSlice";



const { LOGIN_API,SIGNUP_API,SENDOTP_API} = authEndpoint

export async function sendotp(email,password,confirmPassword,navigate){

    const toastId = toast.loading("Loading");

    try{ 

        const res = await apiConnector("POST",SENDOTP_API,{email:email,password:password,confirmPassword:confirmPassword});

        // console.log("res of the sendotp api -->",res);
        toast.success("otp send successfully")

        toast.dismiss(toastId)
        navigate('/otp')

    }catch(error){
        toast.error(error?.response?.data?.message)
        // console.log("error form the send otp api -->",error)
    }

    toast.dismiss(toastId)
}

export async function signup (firstName,lastName,email,password,confirmPassword,otp,navigate){

    const toastId = toast.loading("Loading")

    try{

        const res = await apiConnector("POST",SIGNUP_API,{firstName,lastName,email,password,confirmPassword,otp});
        // console.log("res of the signup api -->",res);

        toast.success("sign up successfull");
        navigate("/login")
    }catch(error){

        // console.log("error in the sign up api--->",error);
        toast.error(error?.response?.data?.message)

    }

    toast.dismiss(toastId);
}

export async function login(email,password,navigate,dispatch){
    const loading = toast.loading("Looading...")

    try{

        const res = await apiConnector("POST",LOGIN_API,{email,password});

        // console.log("response of the login api -->",res);
     
        dispatch(setToken(res?.data?.token))
        localStorage.setItem("token",JSON.stringify(res?.data?.token))
        localStorage.setItem("user",JSON.stringify(res?.data?.user))
        dispatch(setUser(res?.data?.user))

        toast.success("Login successfull")
        navigate("/dashboard/my-project")
    }catch(error){
        toast.error(error?.response?.data?.message)
        // console.log("Error from the login api --->",error)
    }
    toast.dismiss(loading)
}