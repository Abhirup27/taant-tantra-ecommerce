import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Check } from "typeorm";

@Entity("addresses")
@Check(`"pincode" ~ '^[1-9][0-9]{5}$'`)
@Check(`"phone" ~ '^[6-9][0-9]{9}$'`)
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 100 })
  full_name!: string;

  @Column({ type: "varchar", length: 15 })
  phone!: string;

  @Column({ type: "varchar", length: 150 })
  address_line_1!: string; // house / flat / building

  @Column({ type: "varchar", length: 150, nullable: true })
  address_line_2?: string; // landmark / area

  @Column({ type: "varchar", length: 100 })
  locality!: string; // area / colony

  @Column({ type: "varchar", length: 100 })
  city!: string;

  @Column({ type: "varchar", length: 100 })
  district!: string;

  @Column({ type: "varchar", length: 100 })
  state!: string;

  @Column({ type: "varchar", length: 6 })
  pincode!: string;

  @Column({ type: "varchar", length: 3, default: "IN" })
  country_code!: string;


  @Column({
    type: "varchar",
    length: 20,
  })
  address_type!: "shipping" | "billing" | "pickup" | "return";

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

