import { configureStore } from "@reduxjs/toolkit";
import boardsSlice from "./boardsSlice";
import factorsSlice from "./factorsSlice";

const store = configureStore({
    reducer: {
        boards: boardsSlice,
        factors: factorsSlice
    }
})

export default store