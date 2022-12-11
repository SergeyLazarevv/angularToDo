import { Component } from '@angular/core';
import { TodoListService } from './app.service';
import { ConfirmModalService } from '../common/confirmModal/confirmModal.service';
import { ToDoItem } from './app.interface'
import { map, switchMap, tap } from 'rxjs'
     
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['app.component.scss'],
    providers: [TodoListService, ConfirmModalService]
})

export class AppComponent { 

    toDoList: ToDoItem[] = [];
    newTaskText: string = "";
    showModal: boolean = false;
    _searchString: string = localStorage.getItem('searchString') || ""
    
    get searchString(): string {
        return this._searchString;
    }
    set searchString(value: string) {
        if (value !== this._searchString) {
            localStorage.setItem('searchString', value)
            this._searchString = value
        }
    }

    get comleteCount() {
        return this.toDoList.filter((item) => item.isCompleted).length
    }

    _isSomeOneEdit: boolean = false
    get isSomeOneEdit(): boolean {
        return this.toDoList.some(task => task.isEdit)
    }  

    constructor(
        protected toDoListService: TodoListService, 
        private confirmService: ConfirmModalService
    ){}

    addNewTask(newTaskText: string): void {
        if(newTaskText) {
            let task: ToDoItem = { text: newTaskText, isCompleted: false }
            this.newTaskText = ""
            this.toDoListService.addNewTask(task).subscribe({next:(data: ToDoItem) => this.toDoList.unshift(data)});
        }
    }
    changeTask(item: ToDoItem) {
        const task: ToDoItem = this.removeAdditionalFields(item)
        this.toDoListService.changeTask(task)
            .pipe(
                switchMap(changedtask => this.toDoListService.getTodoList(this.searchString)
                    .pipe(
                        map((todoList: ToDoItem[]) => todoList.sort((a,b) => b.id - a.id))
                    )
                )
            )
            .subscribe((todoList: ToDoItem[]) => this.toDoList = this.addAdditionalFields(todoList))
    }
    editTask(task: ToDoItem): void {
        task.isEdit = true
        localStorage.setItem('beforeEditText', task.text)
    }
    cancelEditTask(task: ToDoItem): void {
        task.isEdit = false
        task.text = localStorage.getItem('beforeEditText')
        localStorage.removeItem('beforeEditText')
    }
    changeTaskComplete(task: ToDoItem): void {
        task.isCompleted = !task.isCompleted
        this.changeTask(task)
    }
    deleteTask(id: number) {

        this.confirmService.confirm("Элемент списка будет удалён, продолжить?",
        function yes(){

            this.toDoListService.deleteTask(id).pipe(
                switchMap(deletedtask => this.toDoListService.getTodoList(this.searchString)
                    .pipe(
                        map((todoList: ToDoItem[]) => todoList.sort((a,b) => b.id - a.id))
                    )
                )
            )
            .subscribe({next:(todoList: ToDoItem[]) => this.toDoList = this.addAdditionalFields(todoList)});
            this.confirmService.close()
        }.bind(this),
        function no(){

            this.confirmService.close()
        }.bind(this))
    }

    removeAdditionalFields(task: ToDoItem): ToDoItem {
        return {
            id: task.id,
            text: task.text,
            isCompleted: task.isCompleted
        }
    }
    addAdditionalFields(tasks: ToDoItem[]): ToDoItem[] {
        return tasks.map(task => {
            return {
                id: task.id,
                isEdit: false,
                text: task.text,
                isCompleted: !!task.isCompleted,
            }
        })
    }
    getTodoList(searchString: string) {
        this.toDoListService.getTodoList(searchString)
            .pipe(
                tap((todoList: ToDoItem[]) => console.log(todoList)),
                map((todoList: ToDoItem[]) => todoList.sort((a,b) => b.id - a.id))
            )
            .subscribe({next:(todoList: ToDoItem[]) => {
                console.log('1111 ', todoList)
                this.toDoList = this.addAdditionalFields(todoList)
            }});
    }
    ngOnInit(){
        this.getTodoList(this.searchString)
    }
}