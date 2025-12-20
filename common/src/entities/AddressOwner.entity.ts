import { Entity, Check, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Address } from "./address.entity.js";

@Entity("address_owners")
@Check(`"owner_type" IN ('user', 'supplier')`)
export class AddressOwner {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "uuid" })
  address_id!: string;


  @Column({ type: "boolean", default: false })
  is_default!: boolean;

  @ManyToOne(() => Address, { onDelete: "CASCADE" })
  @JoinColumn({ name: "address_id" })
  address!: Address;

  @Column({ type: "uuid" })
  owner_id!: string;

  @Column({ type: "varchar", length: 20 })
  owner_type!: "user" | "supplier";
}

