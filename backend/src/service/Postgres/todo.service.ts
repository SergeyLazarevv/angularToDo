import { Injectable } from '@nestjs/common';
import { Todo } from "../../entity/Todo"
import { AppDataSource } from "./index"

@Injectable()
export class TodoService {

  async getTodoList(substr: string) {

    const query = await AppDataSource.getRepository(Todo).createQueryBuilder("todo")
    if(substr) query.where("todo.text like :substr", { substr:`%${substr}%` });
    const list = await query.getMany();
    return list.map(todoItem => {
      return {
        id: todoItem.id,
        text: todoItem.text,
        isCompleted: todoItem.is_completed
      }
    })
  }

  async addItem(item) {

    const newItem = await AppDataSource.getRepository(Todo).createQueryBuilder("todo")
      .insert()
      .into(Todo)
      .values(item)
      .execute()

    const newItemId = newItem.identifiers[0].id
    
    return await AppDataSource.getRepository(Todo)
      .createQueryBuilder("todo")
      .where("todo.id = :id", { id: newItemId })
      .getOne();
  }

  async deleteItem(id: number) {
    await AppDataSource.getRepository(Todo)
      .createQueryBuilder("todo")
      .delete()
      .from(Todo)
      .where("id = :id", { id })
      .execute()
  }

  async chgItem(item) {
    // console.log(item)
    // console.log(+item.isCompleted)
    await AppDataSource.getRepository(Todo)
      .createQueryBuilder("todo")
      .update(Todo)
      .set({ text: item.text, is_completed: +item.isCompleted })
      .where("id = :id", { id: item.id })
      .execute()
  }
}
