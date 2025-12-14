import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Relation } from "typeorm";
import { AttributeValue } from "./AttributeValue.entity.js";
import { Product } from "./product.entity.js";

@Entity("product_attribute_values")
export class ProductAttributeValue {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  product_id!: string;

  @ManyToOne(() => Product, (p) => p.attributes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "product_id" })
  product!: Relation<Product>;

  @Column()
  attribute_value_id!: number;

  @ManyToOne(() => AttributeValue, (v) => v.products)
  @JoinColumn({ name: "attribute_value_id" })
  attribute_value!: Relation<AttributeValue>;
}

