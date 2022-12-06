export interface ToDoItem {
    readonly id?: number,
    isEdit?: boolean,
    text: string,
    isCompleted: boolean
}