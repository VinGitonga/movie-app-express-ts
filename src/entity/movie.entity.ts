import { Column, Entity } from "typeorm";
import BaseModel from "./base-model.entity";

@Entity()
export class Movie extends BaseModel {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  director: string;

  @Column()
  year: number;

  @Column()
  rating: string;

  @Column()
  image: string;

  @Column()
  cast: string;
}
