import { configureStore } from "@reduxjs/toolkit";
import jobreducer from "../src/jobslice"
const store = configureStore({
    reducer : {
        job : jobreducer
    }
})

export default store