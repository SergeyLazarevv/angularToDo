import { Controller, Get } from '@nestjs/common';
import { TodoService } from '../service/Postgres/todo.service';

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('todoList')
    async getTodoList() {
      return this.todoService.getTodoList();
  }
}
