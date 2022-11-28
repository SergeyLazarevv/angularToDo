export interface ToDoItem {
    id?: number,
    beforeEditText?: string,
    isEdit?: boolean,
    hide?: boolean,
    text: string,
    isCompleted: boolean
}