export interface Session {
    id: number,
    status: string,
    startTime: Date,
    endTime: Date,
    active: boolean,
    operatorId: number,
    operatorName: string,
    windowId: number,
    windowNumber: number,
    windowName: string,
    branchId: number,
    branchName: string
}