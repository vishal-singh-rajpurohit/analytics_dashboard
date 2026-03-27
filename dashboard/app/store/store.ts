import { configureStore } from "@reduxjs/toolkit";
import filterSlice  from "./functions/filters";
import toggleSlice  from "./functions/toggle";

export const store = configureStore({
    reducer:{
        filter: filterSlice,
        toggle: toggleSlice
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;