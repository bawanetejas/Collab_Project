import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token:localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")) :"",
    user:localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")) :"",
    signupData:"",
    resetEmail:""
}
export const authSlice = createSlice({

    name:"auth",
    initialState,

    // reducers collection of function who changed the state of variable
    reducers:{
        setSignupData(state,value){
            state.signupData = value.payload
        },
        setToken(state,value){
            state.token = value.payload
        },
        setUser(state,value){
            state.user =value.payload
        },
        setResetEmail(state,value){
            state.resetEmail = value.payload
        }
    }
});

export const {setSignupData,setToken,setUser,setResetEmail}=authSlice.actions

// reducer is responsible for the change of the of state and its a 
// single function in whole slice
export default authSlice.reducer