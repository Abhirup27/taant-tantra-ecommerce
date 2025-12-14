import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity.js";


@Entity('ratings')
export class Ratings {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "p_id" })
  product!: Product;

  @Column({
    type: 'uuid'
  })
  p_id!: string;
}
