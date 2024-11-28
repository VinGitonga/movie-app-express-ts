import { Column, Entity } from "typeorm";
import BaseModel from "./base-model.entity";

@Entity()
export class User extends BaseModel {
    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    role: string
}
