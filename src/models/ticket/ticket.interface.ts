export interface Ticket {
    id: number;
    ticketNumber: number;
    serviceId: number;
    serviceName: string;
    sessionId: number;
    operatorId: number;
    operatorName: string;
    windowNum: number;
    branchId: number;
    branchName: string;
    registrationTime: Date;
    serviceStartTime: Date;
    serviceEndTime: Date;
    status: string;
    bookingTime: Date;
    bookingCode: number;
    directed: boolean;
    redirectedWindowId: number;
    agent: string;
    rating: number;
    language: string,
    waitCountdown: number

}