export interface reportOverview {
    id: string;
    messageId: string;
    createdAt: Date;
}

export interface msgCount {
    _id: string;
    count: number;
}

export interface loginCount {
    _id: string;
    count: number;
}

export interface reportsOverview {
    reports: reportOverviewType[];
}

export interface reportType {
    id: string;
    userId: string;
    contactId: string;
    message: string;
    type: string;
    createdAt: Date;
}

export interface userOverviewType {
    _id: string;
    searchTag: string;
    online: boolean;
}

export interface reportOverviewType {
    _id: string;
    reportType: string;
    message: string;
    createdAt: Date
}

export interface usersOverviewResp {
    users: userOverviewType[];
}

export interface contactOverviewType {
    _id: string;
    createdAt: Date;
    contactType: string;
    members: string[];
}

export interface contactsOverviewResp {
    contacts: contactOverviewType[];
}

export interface LoginAPIResp {
    id: string;
    email: string;
    mobile: string;
    name: string;
    role: string;
    superAdmin: string;
    users: userOverviewType[];
    reports: reportOverviewType[];
    contacts: contactOverviewType[];
    loginCount: loginCount[];
    msgCount: msgCount[];
    prevLoginCount: loginCount[];
    prevMsgCount: msgCount[];
}

export interface ReportFullType {
    _id: string;
    userId: string;
    reportType: string;
    message: string;
    createdAt: string;
    contactId: string;
    reportedBy: {
        _id: string;
        searchTag: string;
    }
}

export interface UserFullType {
    _id: string;
    username: string;
    avatar: string;
    searchTag: string;
    email: string;
    online: boolean;
}