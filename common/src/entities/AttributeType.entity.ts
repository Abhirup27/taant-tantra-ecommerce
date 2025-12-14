import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { CategoryAttributeType } from "./ProductCategoryAttributes.entity.js";
import { AttributeValue } from "./AttributeValue.entity.js";

@Entity("attribute_types")
export class AttributeType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", unique: true })
  name!: string;

  @OneToMany(() => CategoryAttributeType, (catAttr) => catAttr.attribute_type)
  categories!: CategoryAttributeType[];

  @OneToMany(() => AttributeValue, (value) => value.type)
  values!: AttributeValue[];
}

