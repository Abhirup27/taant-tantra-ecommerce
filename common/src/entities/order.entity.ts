import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "./user.entity.js";
import { Transaction } from "./transaction.entity.js";
import { Fulfillment } from "./fulfillment.entity.js";
import { OrderItem } from "./orderItem.entity.js";

export const ORD_CREATED = "created";
export const ORD_PENDING = "pending";
export const ORD_SHIPPED = "shipped";
export const ORD_CANCELLED = "cancelled";

export const ORDER_STATUS = [
  ORD_CREATED, ORD_PENDING, ORD_SHIPPED, ORD_CANCELLED
] as const;
export type OrderStatus = typeof ORDER_STATUS[number];

@Entity('orders')
export class Order {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    // nullable: false,
    unique: true,
    type: 'varchar',
    // generatedType: "STORED",
    default: () => "'ORD_' || nextval('order_public_id_seq')",

  })
  order_number!: string;

  @Column({
    type: 'uuid',
    nullable: false,
    unique: false
  })
  customer_id!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'customer_id' })
  customer!: User;

  @Column({
    type: 'enum',
    nullable: false,
    enum: ORDER_STATUS
  })
  order_status!: OrderStatus;

  @Column({
    type: 'uuid',
    nullable: false,
    unique: true
  })
  payment_id!: string;

  @OneToOne(() => Transaction)
  @JoinColumn({ name: 'payment_id' })
  tramsaction!: Transaction;



  @OneToMany(() => Fulfillment, (fulfillment) => fulfillment.order)
  fulfillments!: Fulfillment[];


  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items!: OrderItem[];

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updated_at!: Date;

}
