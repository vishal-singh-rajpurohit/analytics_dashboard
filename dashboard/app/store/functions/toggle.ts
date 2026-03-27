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

export const toggleSlice = createSlice({
    name: "toggle",
    initialState: initialStates,
    reducers: {
        setToggleVisit: toggleVisit
    }
})


export const { setToggleVisit } = toggleSlice.actions;
export default toggleSlice.reducer;