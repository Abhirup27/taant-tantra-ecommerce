import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, Relation } from "typeorm";
import { AttributeType } from "./AttributeType.entity.js";
import { ProductAttributeValue } from "./ProductAttributeValues.entity.js";

@Entity("attribute_values")
export class AttributeValue {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type_id!: number;

  @ManyToOne(() => AttributeType, (type) => type.values)
  @JoinColumn({ name: "type_id" })
  type!: Relation<AttributeType>;

  @Column({ type: "varchar" })
  value!: string;

  @OneToMany(() => ProductAttributeValue, (pav) => pav.attribute_value)
  products!: ProductAttributeValue[];
}

