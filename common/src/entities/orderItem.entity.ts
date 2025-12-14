import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Relation,
  JoinColumn
} from "typeorm";
import { Order } from "./order.entity.js";
import { Product } from "./product.entity.js";


@Entity("order_items")
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "uuid" })
  order_id!: string;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: "CASCADE" })
  @JoinColumn({ name: "order_id" })
  order!: Relation<Order>;

  @Column({ type: "uuid" })
  product_id!: string;

  @ManyToOne(() => Product, { onDelete: "RESTRICT" })
  @JoinColumn({ name: "product_id" })
  product!: Relation<Product>;

  @Column({ type: "varchar" })
  product_name!: string;

  @Column({ type: "varchar" })
  product_public_id!: string;

  @Column({ type: "varchar", length: 3, default: "INR" })
  currency!: string;

  @Column({ type: "integer" })
  unit_price!: number;

  @Column({ type: "integer" })
  quantity!: number;

  @Column({ type: "integer" })
  total_price!: number;

  @Column({ type: "jsonb", nullable: true })
  attributes!: Record<string, any>;
}

