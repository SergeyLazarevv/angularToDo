import "reflect-metadata"
import { DataSource } from "typeorm"
import { Todo } from "./Todo"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "postgres",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    entities: [Todo],
    synchronize: true,
    logging: false,
})

AppDataSource.initialize().catch((error) => console.log('psql init error ', error))