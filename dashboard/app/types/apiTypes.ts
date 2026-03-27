export interface reportOverview {
    id: string;
    messageId: string;
    createdAt: Date;
}

export interface reportType {
    id: string;
    userId: string;
    contactId: string;
    message: string;
    type: string;
    createdAt: Date;
}