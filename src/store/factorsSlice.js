import { createSlice } from "@reduxjs/toolkit";
import factors from "./reducers/factors";
const {reducers, extraReducers, asyncThunks} = factors




const factorsSlice = createSlice({
    name: 'factors',
    initialState: {
        factors: [],
        topics: [],
        subjects: []
    },
    reducers,
    extraReducers
})

export default factorsSlice.reducer
export const actions = {...factorsSlice.actions, ...asyncThunks};

