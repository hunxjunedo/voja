import { createSlice } from "@reduxjs/toolkit";
import boards from "./reducers/boards";
const {reducers, extraReducers, asyncThunks} = boards

const boardsSlice = createSlice({
    name: 'boards',
    initialState: { boards: [], currentBoard: 0, loading: false },
    reducers,
    extraReducers
})



export default boardsSlice.reducer
export const actions = { ...boardsSlice.actions, ...asyncThunks }