import { Controller, Get, Post, Patch, Delete, Req, Body } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Request } from 'express';
import { TodoItem } from './todo.interface'


@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('getList')
  async getTodoList(@Req() request: Request): Promise<TodoItem[]> {

    const substr: string = request.query.text_like as string
    return await this.todoService.getTodoList(substr);
  }

  @Post('add')
  async addItem(@Body() todo): Promise<TodoItem> {

    const newTodoItem: TodoItem = {
      text: todo.text,
      is_completed: +todo.isCompleted
    }
    return await this.todoService.addItem(newTodoItem)
  }

  @Delete('delete/:id')
  async deleteItem(@Req() request: Request): Promise<void> {

    const id: number = +request.params.id
    return await this.todoService.deleteItem(id);
  }

  @Patch('/change')
  async changeItem(@Body() todo: TodoItem): Promise<void> {

    return await this.todoService.chgItem(todo)
  }
}

