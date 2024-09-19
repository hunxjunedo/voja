import { createAsyncThunk } from "@reduxjs/toolkit"
import { db } from "../../db/db"

const extraReducers = (builder) => {

    builder.addCase(asyncThunks.addBoard.fulfilled, (state, { payload: board }) => {
        state.boards.push(board)
    })

        .addCase(asyncThunks.editBoard.fulfilled, (state, { payload: updatedBoards }) => {
            state.boards = updatedBoards
        })

        .addCase(asyncThunks.syncBoards.pending, (state) => {
            state.loading = true
        })

        .addCase(asyncThunks.syncBoards.fulfilled, (state, { payload: updatedBoards }) => {
            state.boards = updatedBoards;
            state.loading = false
        })
}

const reducers = {};


const asyncThunks = {

    addBoard: createAsyncThunk(
        'boards/newBoard',
        async (newBoardInfo) => {
            let id = await db.boards.add(newBoardInfo)

            return { ...newBoardInfo, id }
        }
    ),


    editBoard: createAsyncThunk(
        'boards/editBoards',
        async (edits) => {

            let { id } = edits;
            //make sure you reflect these changes in the db
            await db.boards.update(id, { ...edits });
            //so once it updates the db, it fetches all the results back and returns 
            //caution: may cause long rendering time, will look later

            return await db.boards.toArray();
        }
    ),


    syncBoards: createAsyncThunk(
        'boards/updateBoards',
        async (boards) => {
            //the reason why we are using async thunk and not a simple async function which later calls the reducer is that this way, we can use promise status like fulfilled and loading to manage loading states
            //this function serves 2 purposes: 

            // 1: synchronize the local state with the db once webapp is loaded

            // 2: update the db AND local state during the onboarding process when creating new boards, 
            //    in other words, this expects the table to be empty

            if (boards) {
                db.boards.bulkAdd(boards)
            }

            let allBoards = await db.boards.toArray();
            return allBoards
        }
    )
}

export default {
    asyncThunks, reducers, extraReducers
}