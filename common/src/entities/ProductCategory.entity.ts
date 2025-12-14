import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategoryAttributeType } from "./ProductCategoryAttributes.entity.js";

@Entity('product_categories')
export class ProductCategory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', unique: true })
  name!: string;


  @OneToMany(() => CategoryAttributeType, (catAttr) => catAttr.category)
  attributes!: CategoryAttributeType[];
}
