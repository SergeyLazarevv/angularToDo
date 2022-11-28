import { Component } from '@angular/core';
import { TodoListService } from './app.service';
import { ToDoItem } from './app.interface'
import { TestScheduler } from 'rxjs/testing';
     
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [TodoListService]
})

export class AppComponent { 

    toDoList: ToDoItem[] = [];
    newTaskText: string = "";
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

    _isSomeOneEdit: boolean = false
    get isSomeOneEdit() {
        return this.toDoList.some(task => task.isEdit)
    }

    constructor(private toDoListService: TodoListService){}
      
    addNewTask(newTaskText: string): void {
        if(newTaskText) {
            let task: ToDoItem = { text: newTaskText, isCompleted: false }
            this.newTaskText = ""
            this.toDoListService.addNewTask(task).subscribe({next:(data: ToDoItem) => this.toDoList.push(data)});
        }
    }
    changeTask(task: ToDoItem): void {
        task = this.removeAdditionalFields(task)
        this.toDoListService.changeTask(task).subscribe({next:(data: ToDoItem[]) => {
            this.toDoList = this.addAdditionalFields(data)
            this.searchFilter(this.searchString)
        }});
    }
    editTask(task: ToDoItem): void {
        task.isEdit = true
        task.beforeEditText = task.text
    }
    cancelEditTask(task: ToDoItem): void {
        task.isEdit = false
        task.text = task.beforeEditText
        task.beforeEditText = ""
    }
    changeTaskComplete(task: ToDoItem): void {
        task.isCompleted = !task.isCompleted
        task = this.removeAdditionalFields(task)
        this.toDoListService.changeTask(task).subscribe({next:(data: ToDoItem[]) => {
            this.toDoList = this.addAdditionalFields(data)
            this.searchFilter(this.searchString)
        }});
    }
    deleteTask(id: number): void {
        if(confirm('Delete task?'))
        this.toDoListService.deleteTask(id).subscribe({next:(data: ToDoItem[]) => {
            this.toDoList = this.addAdditionalFields(data)
            this.searchFilter(this.searchString)
        }});
    }
    searchFilter(searchText: string) {
        this.toDoList.forEach(task => {
            
            if (task.text.indexOf(searchText) === -1 && this.searchString !== "") {
                task.hide = true
            } else {
                task.hide = false
            }
        })
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
                beforeEditText: "",
                isEdit: false,
                text: task.text,
                isCompleted: task.isCompleted,
                hide: false
            }
        })
    }
    ngOnInit(){
        this.toDoListService.getTasks().subscribe({next:(data: ToDoItem[]) => {
            this.toDoList = this.addAdditionalFields(data)
            this.searchFilter(this.searchString)
        }});
    }
}