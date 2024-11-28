import "reflect-metadata";
import * as path from "path";

import { DataSource } from "typeorm";
import { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } from "./env";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: 5432,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,

  synchronize: false,
  logging: false,
  entities: [path.join(__dirname, "./**/*.entity{.ts,.js}")],
  migrations: [path.join(__dirname, "../migrations/*{.ts,.js}")],
});
