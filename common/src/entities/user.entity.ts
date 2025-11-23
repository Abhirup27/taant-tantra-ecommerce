import { Column, Entity, Check, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import { AuthUser } from "./AuthUser.entity.js";

@Entity()
@Check(`("email" IS NOT NULL OR "phone_number" IS NOT NULL)`)
export default class User {
  @PrimaryColumn({
    type: "uuid",
    nullable: false,
  })
  id!: string;

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
  last_name!: string | null;

  @Column({
    type: "text",
    unique: true,
    nullable: true,
  })
  pfp_image!: string | null;

  @OneToOne(() => AuthUser)
  @JoinColumn({ name: "id" })
  authUser!: AuthUser;

}
