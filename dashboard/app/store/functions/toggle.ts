import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateType{
    isLoading: boolean;
    visitStats: "CLOSE" | "REPORT" | "CONTACT" | "USER";
}

const initialStates: initialStateType = {
    isLoading: false,
    visitStats: "CLOSE"
}

function toggleVisit(state: initialStateType, action: PayloadAction<{visitTo: "CLOSE" | "REPORT" | "CONTACT" | "USER"}>){
    state.visitStats = action.payload.visitTo;
}

function toggleLoadingFunc(state: initialStateType, action: PayloadAction<{toggle: boolean}>){
    state.isLoading = action.payload.toggle
}

export const toggleSlice = createSlice({
    name: "toggle",
    initialState: initialStates,
    reducers: {
        setToggleVisit: toggleVisit,
        toggleLoading: toggleLoadingFunc
    }
})


export const { setToggleVisit, toggleLoading } = toggleSlice.actions;

export default toggleSlice.reducer;