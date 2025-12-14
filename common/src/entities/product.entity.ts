import {
  PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn,
  OneToMany, JoinColumn, ManyToOne,
  Relation
} from "typeorm";

import { ProductAttributeValue } from "./ProductAttributeValues.entity.js";
import { ProductCategory } from "./ProductCategory.entity.js";

// export const S_T_COTTON = 'cotton';
// export const S_T_SILK = 'silk';
// export const S_T_GEORGETTE = 'georgette';
// export const S_T_CHIFFON = 'chiffon';
//
// export const SAREE_TYPES = [
//   S_T_COTTON, S_T_CHIFFON, S_T_GEORGETTE, S_T_SILK
// ] as const;
//
// export type SareeTypes = typeof SAREE_TYPES[number];

@Entity('products')
export class Product {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    default: () => "'P_' || nextval('product_public_id_seq')",    // generatedType: "STORED",
    // asExpression: `'P_' || nextval('product_public_id_seq')`
  })
  public_id!: string;

  @Column({
    type: "uuid",
    nullable: false,
  })
  supplier_id!: string;

  @Column({
    type: 'varchar',
    nullable: false
  })
  name!: string;

  @Column({
    type: 'integer',
    unsigned: true,
    nullable: false,
  })
  price!: number;

  @Column({
    type: 'varchar',
    length: 3,
    default: 'INR'
  })
  currency!: string;


  @Column({
    type: 'integer',
    unsigned: true,
    nullable: false,
    default: 0
  })
  stock!: number;

  // @Column({
  //   type: 'enum',
  //   enum: SAREE_TYPES,
  //   nullable: false,
  // })
  // type!: SareeTypes;
  @Column({
    type: 'text',
    nullable: true,
  })
  description!: string;

  @Column("text", { array: true }) //digitalocean spaces (S3) URLs
  images!: string[];

  @OneToMany(() => ProductAttributeValue, (pav) => pav.product)
  attributes!: ProductAttributeValue[];

  @ManyToOne(() => ProductCategory)
  @JoinColumn({ name: "category_id" })
  category!: Relation<ProductCategory>;

  @Column()
  category_id!: number;

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updated_at!: Date;
}

