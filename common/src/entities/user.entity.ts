import { Column, Entity, Check, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import { AuthUser } from "./AuthUser.entity.js";

@Entity()
@Check(`("email" IS NOT NULL OR "phone_number" IS NOT NULL)`)
export default class User {
  @PrimaryColumn({
    type: "bigint",
    unsigned: true,
    nullable: false,
  })
  id!: number;

  @Column({
    type: "citext",
    unique: true,
    nullable: true,
  })
  email!: string | null;

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
  first_name!: string;


  @Column({
    type: "varchar",
    unique: false,
    nullable: true,
  })
  last_name!: string | false;

  @OneToOne(() => AuthUser)
  @JoinColumn({ name: "id" })
  authUser!: AuthUser;

}
