import { configureStore } from "@reduxjs/toolkit";
import filterSlice  from "./functions/filters";
import toggleSlice  from "./functions/toggle";
import authSlice from "./functions/auth";
import paginationSlice from "./functions/pagination"

export const store = configureStore({
    reducer:{
        filter: filterSlice,
        toggle: toggleSlice,
        auth: authSlice,
        page: paginationSlice
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;