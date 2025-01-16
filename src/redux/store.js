
// create store 
// add provider to the index.js file
// make send otpv---> sign up ---> login flow done 

import { combineReducers } from "@reduxjs/toolkit";
import  authSlice  from "./slicess/authSlice";
import  teamSlice  from "./slicess/teamSlice";
import  taskSlice  from "./slicess/taskSlice";

export const rootReducer = combineReducers({

    auth:authSlice,
    team:teamSlice,
    task:taskSlice
})