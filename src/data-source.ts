import 'reflect-metadata'
import { DataSource } from "typeorm";
import { Gadget } from "./entity/Gadget";
import dotenv from 'dotenv';
import { User } from './entity/User';

dotenv.config();

// console.log(process.env.PGPASSWORD)

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.PGHOST,
    username: process.env.PGUSER,
    password: (process.env.PGPASSWORD)?.toString(),
    database: process.env.PGDATABASE,
    synchronize: true,
    ssl:true,
    logging: true,
    entities: [Gadget,User],
    subscribers: [],
    migrations: [],
})

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((error) => console.error("Error connecting to database", error));