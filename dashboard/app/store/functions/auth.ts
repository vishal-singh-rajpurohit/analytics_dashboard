import {createSlice, type PayloadAction} from "@reduxjs/toolkit"

interface intialStateTypes{}

const initialState : intialStateTypes = {}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {}
})


export const {} = authSlice.actions

export default authSlice.reducer