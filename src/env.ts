import * as dotenv from "dotenv";

dotenv.config()

export const DB_HOST = process.env.DB_HOST
export const DB_USERNAME = process.env.DB_USERNAME
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_DATABASE = process.env.DB_DATABASE
export const JWT_SECRET = process.env.JWT_SECRET
export const PORT = process.env.PORT
