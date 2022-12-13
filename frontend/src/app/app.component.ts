import { Component } from '@angular/core';
import { TodoListService } from './app.service';
import { ConfirmModalService } from '../common/confirmModal/confirmModal.service';
import { TodoItem } from './app.interface'
import { map, switchMap, tap } from 'rxjs'
     
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['app.component.scss'],
    providers: [TodoListService, ConfirmModalService]
})

export class AppComponent { 

    toDoList: TodoItem[] = [];
    newItemText: string = "";
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

    get comleteCount(): number {
        return this.toDoList.filter((item: TodoItem) => item.isCompleted).length
    }

    get isSomeOneEdit(): boolean {
        return this.toDoList.some((item: TodoItem) => item.isEdit)
    }  

    constructor(
        protected toDoListService: TodoListService, 
        private confirmService: ConfirmModalService
    ){}

    addNewItem(newItemText: string): void {
        if(newItemText) {
            let item: TodoItem = { text: newItemText, isCompleted: false }
            this.newItemText = ""
            this.toDoListService.addNewItem(item).subscribe({next:(data: TodoItem) => this.toDoList.unshift(data)});
        }
    }
    changeItem(item: TodoItem) {
        const itemForSave: TodoItem = this.removeAdditionalFields(item)
        this.toDoListService.changeItem(itemForSave)
            .pipe(
                switchMap(changedItem => this.toDoListService.getTodoList(this.searchString)
                    .pipe(
                        map((todoList: TodoItem[]) => todoList.sort((a,b) => b.id - a.id))
                    )
                )
            )
            .subscribe((todoList: TodoItem[]) => this.toDoList = this.addAdditionalFields(todoList))
    }
    editItem(item: TodoItem): void {
        item.isEdit = true
        localStorage.setItem('beforeEditText', item.text)
    }
    canceleditItem(item: TodoItem): void {
        item.isEdit = false
        item.text = localStorage.getItem('beforeEditText')
        localStorage.removeItem('beforeEditText')
    }
    changeItemComplete(item: TodoItem): void {
        item.isCompleted = !item.isCompleted
        this.changeItem(item)
    }
    deleteItem(id: number) {

        this.confirmService.confirm("Элемент списка будет удалён, продолжить?",
        function yes(){

            this.toDoListService.deleteItem(id).pipe(
                switchMap(() => this.toDoListService.getTodoList(this.searchString)
                    .pipe(
                        map((todoList: TodoItem[]) => todoList.sort((a,b) => b.id - a.id))
                    )
                )
            )
            .subscribe({next:(todoList: TodoItem[]) => this.toDoList = this.addAdditionalFields(todoList)});
            this.confirmService.close()
        }.bind(this),
        function no(){

            this.confirmService.close()
        }.bind(this))
    }

    removeAdditionalFields(item: TodoItem): TodoItem {
        return {
            id: item.id,
            text: item.text,
            isCompleted: item.isCompleted
        }
    }
    addAdditionalFields(todoList): TodoItem[] {
        return todoList.map(item => {
            return {
                id: item.id,
                isEdit: false,
                text: item.text,
                isCompleted: !!item.is_completed,
            }
        })
    }
    getTodoList(searchString: string) {
        this.toDoListService.getTodoList(searchString)
            .pipe(
                //tap((todoList: TodoItem[]) => console.log(todoList)),
                map((todoList: TodoItem[]) => todoList.sort((a,b) => b.id - a.id))
            )
            .subscribe({next:(todoList: TodoItem[]) => {
                this.toDoList = this.addAdditionalFields(todoList)
            }});
    }
    ngOnInit(){
        this.getTodoList(this.searchString)
    }
    ngOnDestroy() {
        localStorage.removeItem('beforeEditText')
    }
}