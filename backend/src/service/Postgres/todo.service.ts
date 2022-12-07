import { Injectable } from '@nestjs/common';
import { Todo } from "../../entity/Todo"
import { AppDataSource } from "./index"

@Injectable()
export class TodoService {

  async getTodoList() {

    const todoRepository = AppDataSource.getRepository(Todo)
    const todoList = await todoRepository.find()
    return todoList;
  }
}
