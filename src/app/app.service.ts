import { ToDoItem } from './app.interface'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { map, switchMap, tap } from 'rxjs'

@Injectable()
export class TodoListService {
      
    constructor(private http: HttpClient){ }

    getTodoList(searchString?: string): Observable<Object> {
        let url = 'http://localhost:3000/toDoList';
        url = searchString ? url += `?text_like=${searchString}` : url;
        return this.http.get(url)
    }
    addNewTask(task: ToDoItem): Observable<Object> {
        return this.http.post('http://localhost:3000/toDoList', task)
    }
    changeTask(task: ToDoItem): Observable<Object> {
        return this.http.patch('http://localhost:3000/toDoList/' + task.id, task)
    }
    deleteTask(id: number): Observable<Object>  {
        return this.http.delete('http://localhost:3000/toDoList/' + id)
    }
}