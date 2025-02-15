import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


export enum GadgetStatus {
  AVAILABLE = "available",
  DEPLOYED = "deployed",
  DESTROYED = "destroyed",
  DECOMMISSIONED = "decommissioned",
}
@Entity(    )
export class Gadget {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ type: "enum", enum: GadgetStatus, default: GadgetStatus.AVAILABLE })
  status!: string;

  @Column()
  codename: string;

  @Column({ nullable: true })
  destroyedAt?: string;

}
