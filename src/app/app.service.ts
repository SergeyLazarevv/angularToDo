import { ToDoItem } from './app.interface'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable()
export class TodoListService {
      
    constructor(private http: HttpClient){ }

    getTasks(): Observable<Object> {
        return this.http.get('http://localhost:3000/toDoList')
    }
    addNewTask(task: ToDoItem): Observable<Object> {
        return this.http.post('http://localhost:3000/toDoList', task)
    }
    async changeTask(task: ToDoItem): Promise<Observable<Object>> {
        await this.http.patch('http://localhost:3000/toDoList/' + task.id, task).subscribe()
        return this.getTasks()
    }
    async deleteTask(id: number): Promise<Observable<Object>>  {
        await this.http.delete('http://localhost:3000/toDoList/' + id).subscribe()
        return this.getTasks()
    }
}