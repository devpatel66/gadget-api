import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid") // Generates a unique UUID
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
