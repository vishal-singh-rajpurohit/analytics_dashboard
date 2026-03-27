import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateType{
    filter: "WEEKLY"| "MONTHS" |"ANNUAL" | string;
    statNav: "CONTACTS"| "REPORTS"| "USERS"| string;
}

const initialState: initialStateType = {
    filter: "WEEKLY",
    statNav: "REPORTS"
}

function filter(state: initialStateType, action: PayloadAction<{filter: string}>){
    state.filter = action.payload.filter;
}

function stateNav(state: initialStateType, action: PayloadAction<{nav: string}>){
    if(state.statNav === action.payload.nav) return;
    state.filter = 'All';
    state.statNav = action.payload.nav;
}

export const filterSlice = createSlice({
    name: "filters",
    initialState: initialState,
    reducers: {
        setFilter: filter,
        setStateNav: stateNav
    },
})

export const {setFilter, setStateNav} = filterSlice.actions;

export default filterSlice.reducer

