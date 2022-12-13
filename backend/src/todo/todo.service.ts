import { Injectable } from '@nestjs/common';
import { Todo } from "../entity/Todo"
import { AppDataSource } from "../entity/index"
import { TodoItem } from './todo.interface'

@Injectable()
export class TodoService {

  async getTodoList(substr: string): Promise<TodoItem[]> {

    const query = await AppDataSource.getRepository(Todo).createQueryBuilder("todo")
    if(substr) await query.where("todo.text like :substr", { substr:`%${substr}%` })
    return await query.getMany();
  }

  async addItem(item): Promise<TodoItem> {

    const newItem = await AppDataSource.getRepository(Todo).createQueryBuilder("todo")
      .insert()
      .into(Todo)
      .values(item)
      .execute()

    const newItemId: number = newItem.identifiers[0].id
    
    return await AppDataSource.getRepository(Todo)
      .createQueryBuilder("todo")
      .where("todo.id = :id", { id: newItemId })
      .getOne();
  }

  async deleteItem(id: number): Promise<void> {
    await AppDataSource.getRepository(Todo)
      .createQueryBuilder("todo")
      .delete()
      .from(Todo)
      .where("id = :id", { id })
      .execute()
  }

  async chgItem(item): Promise<void> {
  
    await AppDataSource.getRepository(Todo)
      .createQueryBuilder("todo")
      .update(Todo)
      .set({ text: item.text, is_completed: +item.isCompleted })
      .where("id = :id", { id: item.id })
      .execute()
  }
}
