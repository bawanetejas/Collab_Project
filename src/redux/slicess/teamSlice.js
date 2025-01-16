import { createSlice } from "@reduxjs/toolkit";




// think about how to fix progress bar

const initialState ={
    allTask:[],
    teamLead:'',
    team:''
}
export const teamSlice = createSlice({

    name:"team",
    initialState,
    reducers:{
        setAllTask(state,value){
            state.allTask = value.payload
        },
        setTeamLead(state,value){
            state.teamLead=value.payload
        },
        setTeam(state,value){
            state.team=value.payload
        }
    }
})

export const {setAllTask,setTeamLead,setTeam}  = teamSlice.actions

export default teamSlice.reducer;