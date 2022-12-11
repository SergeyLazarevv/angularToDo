import { ToDoItem } from './app.interface'
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { map, switchMap, tap } from 'rxjs'

@Injectable()
export class TodoListService {
      
    httpOptions = {}
    constructor(private http: HttpClient){
        this.httpOptions = {
            headers: new HttpHeaders({ 
              'Access-Control-Allow-Origin':'*'
            })
          };
    }

    getTodoList(searchString?: string): Observable<Object> {
        let url = 'http://localhost:3000/todo/getList';
        url = searchString ? url += `?text_like=${searchString}` : url;
        return this.http.get(url)
    }
    addNewTask(task: ToDoItem): Observable<Object> {
        return this.http.post('http://localhost:3000/todo/add', task)
    }
    changeTask(task: ToDoItem): Observable<Object> {
        console.log(task)
        return this.http.patch('http://localhost:3000/todo/change', task)
    }
    deleteTask(id: number): Observable<Object>  {
        return this.http.delete('http://localhost:3000/todo/delete/' + id)
    }
}