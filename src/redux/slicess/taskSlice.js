import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    task:'',
    myTodos:[],
    myTask:'',
}
const taskSlice = createSlice({

    name:"task",
    initialState,
    reducers:{
        setTask(state,value){
            state.task =value.payload
        },
        setMyTodos(state,value){
            state.myTodos = value.payload
        },
        setMyTask(state,value){
            state.myTask=value.payload
        },
    }
});

export const {setTask,setMyTodos,setMyTask} = taskSlice.actions

export default taskSlice.reducer;