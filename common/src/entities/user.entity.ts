import { Column, Entity, Check, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import { AuthUser } from "./AuthUser.entity.js";

export const CUSTOMER = 'customer';
export const ADMIN = 'admin';
export const SUPER_ADMIN = 'super admin'; // manage a supplier, create admin(team members)
export const OWNER = 'Owner';
export const DEV_OPS = 'dev ops';

export const ALL_USER_TYPES = [
  CUSTOMER, ADMIN, SUPER_ADMIN, OWNER, DEV_OPS
] as const;

export type UserTypes = typeof ALL_USER_TYPES[number];
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

  @Column({
    type: 'enum',
    enum: ALL_USER_TYPES,
    default: CUSTOMER,
    nullable: true,
  })
  type!: UserTypes | null;

  @OneToOne(() => AuthUser)
  @JoinColumn({ name: "id" })
  authUser!: AuthUser;

}
