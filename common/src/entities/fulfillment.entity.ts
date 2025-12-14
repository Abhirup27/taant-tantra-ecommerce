import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Order } from "./order.entity.js";
import Supplier from "./supplier.entity.js";

export const FS_INIT = "initiated";
export const FS_ON_WAY = "on the way";
export const FS_FAILED = "failed";
export const FS_SHIPPED = "shipped";
export const FS_REFUNDED = "refunded";


export const FULFILLMENT_STATE = [
  FS_INIT, FS_ON_WAY, FS_SHIPPED, FS_FAILED, FS_REFUNDED
] as const;

export type FulfillmentState = typeof FULFILLMENT_STATE[number];


@Entity('fulfillments')
export class Fulfillment {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    nullable: true,
    unique: true,
  })
  consignment_id!: string | null;

  @Column({
    type: 'uuid',
    nullable: false,
  })
  order_id!: string;


  @ManyToOne(() => Order, (o) => o.fulfillments, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: 'order_id' })
  order!: Relation<Order>;

  @Column({
    type: 'uuid',
    nullable: false,
  })
  supplier_id!: string;

  @ManyToOne(() => Supplier)
  @JoinColumn({ name: 'supplier_id' })
  supplier!: Supplier;

  @Column({
    type: 'enum',
    enum: FULFILLMENT_STATE,
    nullable: false,
    default: FULFILLMENT_STATE[0],
  })
  state!: FulfillmentState;


  @Column({
    type: 'boolean',
    nullable: false,
    default: false
  })
  refunded!: boolean


}
