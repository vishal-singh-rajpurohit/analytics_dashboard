import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface initialStateType{
    contentLimit: number;
    reportPage: number;
    hasReportsFurther: boolean;
    userPage: number;
    hasUsersFurther: boolean;
    contactPage: number;
    hasContactsFurther: boolean;
}

const initialState: initialStateType = {
    contentLimit: 2,
    contactPage: 1,
    hasContactsFurther: true,
    reportPage: 1,
    hasReportsFurther: true,
    userPage: 1,
    hasUsersFurther: true
}

function setContactPerPageFunc(state: initialStateType, action: PayloadAction<{count: number}>){
    state.contactPage = action.payload.count;
}

function changePageFunc(state: initialStateType, action: PayloadAction<{tableType: "REPORT" | "USER" | "CONTACT"; act: "INC" | "DEC"}>){
    const {act, tableType} = action.payload;

    if(tableType === "REPORT"){
        if(act === "INC"){
            state.reportPage = state.reportPage + 1;
        }
        else if(act === "DEC"){
            state.reportPage = state.reportPage - 1;
        }
    }
    else if(tableType === "CONTACT"){
        if(act === "INC"){
            state.contactPage = state.contactPage + 1;
        }
        else if(act === "DEC"){
            state.contactPage = state.contactPage - 1;
        }
    }
    else if(tableType === "USER"){
        if(act === "INC"){
            state.userPage = state.userPage + 1;
        }
        else if(act === "DEC"){
            state.userPage = state.userPage - 1;
        }
    }
}

function changeHasNextFunc(state: initialStateType, action: PayloadAction<{tableType: "REPORT" | "USER" | "CONTACT"; toggle: boolean}>){
    const {tableType} = action.payload;

    if(tableType === "REPORT"){
        state.hasReportsFurther = action.payload.toggle;
    }
    else if(tableType === "CONTACT"){
        state.hasContactsFurther = action.payload.toggle;
    }
    else if(tableType === "USER"){
        state.hasUsersFurther = action.payload.toggle;
    }
}

export const paginationSlice = createSlice({
    name: "pagination",
    initialState: initialState,
    reducers: {
        setContentPerPage: setContactPerPageFunc,
        changePage: changePageFunc,
        changeHasNext: changeHasNextFunc
    }
})

export const {setContentPerPage, changePage, changeHasNext} = paginationSlice.actions

export default paginationSlice.reducer