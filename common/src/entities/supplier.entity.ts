import { Column, Entity, PrimaryColumn, OneToOne, JoinColumn, } from "typeorm";
import User from "./user.entity.js";

@Entity('suppliers')
export default class Supplier {
  @PrimaryColumn({
    type: "uuid",
    nullable: false,
  })
  id!: string;

  //Super Admin ID, this is the ID of the super admin, they can add new team members in their respective supplier team
  @Column({
    type: "uuid",
    nullable: false,
  })
  sa_id!: string;
  @Column({
    type: "citext",
    unique: true,
    nullable: true,
  })
  email!: string | null; //same as the sa_id's email.

  @Column(
    {
      type: "varchar",
      unique: true,
      nullable: true,
    }
  )
  phone_number!: string | null;

  @Column({
    type: "varchar",
    unique: false,
    nullable: false,
  })
  name!: string; //supplier's name

  @OneToOne(() => User)
  @JoinColumn({ name: "sa_id" })
  super_admin!: User;

}

