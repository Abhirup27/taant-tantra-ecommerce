import { AppDataSource } from "../config/typeorm.config.js";
import { ProductAttributeValue } from "../entities/ProductAttributeValues.entity.js";
import { Product } from "../entities/product.entity.js";
import { AttributeValue } from "../entities/AttributeValue.entity.js";

export async function seedProductAttributes() {
  const pavRepo = AppDataSource.getRepository(ProductAttributeValue);
  const product = await AppDataSource.getRepository(Product).findOneByOrFail({});
  const red = await AppDataSource.getRepository(AttributeValue).findOneByOrFail({ value: "Red" });

  await pavRepo.save({
    product_id: product.id,
    attribute_value_id: red.id,
  });
}

