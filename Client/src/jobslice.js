import {createSlice} from "@reduxjs/toolkit"
const jobSlice = createSlice({
    name : "jobdata",
    initialState : {
        jobdata : {},
        user : false
    },
    reducers : {
        adddata : (state, action) =>{
            state.jobdata = action.payload
        },
        handleuser : (state, action) =>{
            console.log(action.payload);
            state.user = action.payload
        }
    }
})
export const { adddata, handleuser} = jobSlice.actions
export default jobSlice.reducer