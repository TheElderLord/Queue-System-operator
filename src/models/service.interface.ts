export interface Service {
    id: number | undefined
    name: string | undefined
    description: string | undefined
    parentName: string | undefined
    priority: number | undefined
    parentId: number | null | undefined
    maxServTime: number | null | undefined
    maxWaitTime: number | null | undefined,
    startRange: number | null | undefined,
    endRange: number | null | undefined,


}
