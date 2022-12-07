import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name:"todo", synchronize: false})
export class Todo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 100})
    text: string;

    @Column({nullable: false})
    is_completed: number;
}