export interface TodoItem {
    readonly id?: number,
    isEdit?: boolean,
    text: string,
    isCompleted: boolean
}