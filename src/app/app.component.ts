import { Component } from '@angular/core';
import { TodoListService } from './app.service';
import { ToDoItem } from './app.interface'
     
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [TodoListService]
})

export class AppComponent { 

    toDoList: ToDoItem[] = [];
    newTaskText: string = "";

    constructor(private toDoListService: TodoListService){}
      
    addNewTask(newTaskText: string): void {
        if(newTaskText) {
            let task: ToDoItem = { text: newTaskText, isCompleted: false }
            this.newTaskText = ""
            this.toDoListService.addNewTask(task).subscribe({next:(data: ToDoItem) => this.toDoList.push(data)});
        }
    }
    changeTask(task: ToDoItem): void {
        //task.isCompleted = !task.isCompleted
        this.toDoListService.changeTask(task).subscribe({next:(data: ToDoItem[]) => this.toDoList = this.setEditState(data)});
    }
    changeTaskComplete(task: ToDoItem): void {
        this.toDoListService.changeTaskComplete(task).subscribe({next:(data: ToDoItem[]) => this.toDoList = this.setEditState(data)});
    }
    deleteTask(id: number): void {
        this.toDoListService.deleteTask(id).subscribe({next:(data: ToDoItem[]) => this.toDoList = this.setEditState(data)});
    }
    setEditState(tasks: ToDoItem[]): ToDoItem[] {
        console.log(tasks)
        return tasks.map(task => {
            task.isEdit = false
            return task
        })
    }
    ngOnInit(){
        this.toDoListService.getTasks().subscribe({next:(data: ToDoItem[]) => this.toDoList = this.setEditState(data)});
    }
}