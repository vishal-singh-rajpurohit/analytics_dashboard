import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { contactOverviewType, loginCount, msgCount, ReportFullType, reportOverviewType, UserFullType, userOverviewType } from '@/app/types/apiTypes'

interface adminTypes {
    id: string;
    fullName: string;
    email: string;
    mobile: string;
    role: string;
    autharisedBy: string;
}

interface intialStateTypes {
    admin: adminTypes;
    users: userOverviewType[];
    reports: reportOverviewType[];
    contacts: contactOverviewType[];
    selective: {
        users: userOverviewType[];
        reports: reportOverviewType[];
        contacts: contactOverviewType[];
    };
    analytics: {
        loginCount: loginCount[],
        msgCount: msgCount[],
        prevLoginCount: loginCount[],
        prevMsgCount: msgCount[],
    };
    fullData: {
        report: ReportFullType;
        user: UserFullType;
    };
}

function setFullStatesFunc(state: intialStateTypes, action: PayloadAction<{ data: intialStateTypes }>) {
    state.admin = action.payload.data.admin;
    state.contacts = action.payload.data.contacts;
    state.reports = action.payload.data.reports;
    state.users = action.payload.data.users;
    state.selective.contacts = action.payload.data.contacts;
    state.selective.reports = action.payload.data.reports;
    state.selective.users = action.payload.data.users;
    state.analytics.loginCount = action.payload.data.analytics.msgCount;
    state.analytics.msgCount = action.payload.data.analytics.msgCount;
}

function addReportsFunc(state: intialStateTypes, action: PayloadAction<{ data: reportOverviewType[] }>) {
    state.reports = [
        ...state.reports, ...action.payload.data
    ];
    state.selective.reports = [
        ...action.payload.data
    ];
}

function addContactssFunc(state: intialStateTypes, action: PayloadAction<{ data: contactOverviewType[] }>) {
    state.contacts = [
        ...state.contacts, ...action.payload.data
    ];
    state.selective.contacts = [
        ...action.payload.data
    ];
}

function addUsersFunc(state: intialStateTypes, action: PayloadAction<{ data: userOverviewType[] }>) {
    state.users = [
        ...state.users, ...action.payload.data
    ];
    state.selective.users = [
        ...action.payload.data
    ];
}

function getLocalReportsFunc(state: intialStateTypes, action: PayloadAction<{ data: reportOverviewType[] }>) {
    state.selective.reports = [
        ...action.payload.data
    ];
}

function getLocalContactsFunc(state: intialStateTypes, action: PayloadAction<{ data: contactOverviewType[] }>) {
    state.selective.contacts = [
        ...action.payload.data
    ];
}

function getLocalUserscFunc(state: intialStateTypes, action: PayloadAction<{ data: userOverviewType[] }>) {
    state.selective.users = [
        ...action.payload.data
    ];
}

function getNextDataFunc(state: intialStateTypes, action: PayloadAction<{
    currentPage: number;
    limit: number;
    tableType: "REPORT" | "USER" | "CONTACT";
}>) {
    const { currentPage, limit, tableType } = action.payload;

    // let start = currentPage * limit; // for production
    let start = (currentPage - 1) * limit;

    if (tableType === "REPORT") {
        state.selective.reports = []

        state.selective.reports = state.reports.slice(
            Math.max(0, start),
            Math.max(0, start + limit)
        )
    }
    else if (tableType === "CONTACT") {
        state.selective.contacts = []
        state.selective.contacts = state.contacts.slice(
            Math.max(0, start),
            Math.max(0, start + limit)
        )
    }
    else if (tableType === "USER") {
        state.selective.users = []
        state.selective.users = state.users.slice(
            Math.max(0, start),
            Math.max(0, start + limit)
        )
    }
}

function getPrevDataFunc(state: intialStateTypes, action: PayloadAction<{
    currentPage: number;
    limit: number;
    tableType: "REPORT" | "USER" | "CONTACT";
}>) {
    const { currentPage, limit, tableType } = action.payload;
    let initIndex = ((currentPage - 3) * limit)

    // console.log("getting prev data: ", Math.max(0, initIndex))
    // console.log("getting prev data: ", Math.max(0, initIndex + limit))
    if (tableType === "REPORT") {
        state.selective.reports = [];

        state.selective.reports = state.reports.slice(
            Math.max(0, initIndex),
            Math.max(0, initIndex + limit),
        )
    }
    else if (tableType === "CONTACT") {
        state.selective.contacts = [];
        state.selective.contacts = state.contacts.slice(
            Math.max(0, initIndex),
            Math.max(0, initIndex + limit),
        )
    }
    else if (tableType === "USER") {
        state.selective.users = [];
        state.selective.users = state.users.slice(
            Math.max(0, initIndex),
            Math.max(0, initIndex + limit),
        )
    }
}

function addSingleReportFunc(state: intialStateTypes, action: PayloadAction<{ data: ReportFullType }>) {
    state.fullData.report = action.payload.data
}

function addSingleUserFunc(state: intialStateTypes, action: PayloadAction<{ data: UserFullType }>) {
    state.fullData.user = action.payload.data
}

const initialState: intialStateTypes = {
    admin: {
        id: "",
        fullName: "",
        email: "",
        mobile: "",
        role: "",
        autharisedBy: ""
    },
    users: [],
    reports: [],
    contacts: [],
    selective: {
        users: [],
        reports: [],
        contacts: [],
    },
    analytics: {
        loginCount: [],
        prevLoginCount: [],
        msgCount: [],
        prevMsgCount: [],
    },
    fullData: {
        report: {
            _id: "",
            contactId: "",
            createdAt: "",
            message: "",
            reportType: "",
            userId: "",
            reportedBy: {
                _id: "",
                searchTag: ""
            }
        },
        user: {
            _id: "",
            email: "",
            avatar: "",
            online: false,
            searchTag: "",
            username: ""
        }
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAuthStates: setFullStatesFunc,
        addReports: addReportsFunc,
        addContacts: addContactssFunc,
        addUsers: addUsersFunc,
        getLocalReports: getLocalReportsFunc,
        getLocalContacts: getLocalContactsFunc,
        getLocalUsers: getLocalUserscFunc,
        getNextData: getNextDataFunc,
        getPrevData: getPrevDataFunc,
        addSingleReport: addSingleReportFunc,
        addSingleUser: addSingleUserFunc
    }
})


export const { setAuthStates, addContacts, addReports, addUsers, getLocalContacts, getLocalReports, getLocalUsers, getNextData, getPrevData, addSingleReport, addSingleUser } = authSlice.actions




export default authSlice.reducer