import { Controller, Get, Post, Patch, Delete, Req, Body } from '@nestjs/common';
import { TodoService } from '../service/Postgres/todo.service';
import { Request } from 'express';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('getList')
  async getTodoList(@Req() request: Request) {

    const substr: string = request.query.text_like as string
    return await this.todoService.getTodoList(substr);
  }

  @Post('add')
  async addItem(@Body() todo) {

    const newTodoItem = {
      text: todo.text,
      is_completed: +todo.isCompleted
    }
    return await this.todoService.addItem(newTodoItem)
  }

  @Delete('delete/:id')
  async deleteItem(@Req() request: Request) {

    const id: number = +request.params.id
    return await this.todoService.deleteItem(id);
  }

  @Patch('/change')
  async changeItem(@Body() todo) {

    return await this.todoService.chgItem(todo)
  }
}

