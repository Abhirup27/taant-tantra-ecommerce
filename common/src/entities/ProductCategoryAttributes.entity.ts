import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { ProductCategory } from "./ProductCategory.entity.js";
import { AttributeType } from "./AttributeType.entity.js";

@Entity('category_attribute_types')
export class CategoryAttributeType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  category_id!: number;


  @ManyToOne(() => ProductCategory, (c) => c.attributes)
  @JoinColumn({ name: "category_id" })
  category!: Relation<ProductCategory>;

  @Column()
  attribute_type_id!: number;

  @ManyToOne(() => AttributeType, (t) => t.categories)
  @JoinColumn({ name: "attribute_type_id" })
  attribute_type!: Relation<AttributeType>;
}

