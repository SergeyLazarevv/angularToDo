import { ToDoItem } from './app.interface'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConnectableObservable, Observable, Observer } from 'rxjs'

@Injectable()
export class TodoListService {
      
    constructor(private http: HttpClient){ }

    getTasks(): Observable<Object> {
        return this.http.get('http://localhost:3000/toDoList')
    }
    addNewTask(task: ToDoItem): Observable<Object> {
        return this.http.post('http://localhost:3000/toDoList', task)
    }
    changeTask(task: ToDoItem): Observable<Object> {
        this.http.patch('http://localhost:3000/toDoList/' + task.id, task).subscribe({next:(data) => console.log('changed')})
        return this.getTasks()
    }
    changeTaskComplete(task: ToDoItem): Observable<Object> {
        task.isCompleted = !task.isCompleted
        console.log(task)
        return this.changeTask(task)
    }
    deleteTask(id: number): Observable<Object>  {
        this.http.delete('http://localhost:3000/toDoList/' + id).subscribe({next:(data) => console.log('deleted')})
        return this.getTasks()
    }
}