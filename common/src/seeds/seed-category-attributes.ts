import { AppDataSource } from "../config/typeorm.config.js";
import { ProductCategory } from "../entities/ProductCategory.entity.js";
import { AttributeType } from "../entities/AttributeType.entity.js";
import { CategoryAttributeType } from "../entities/ProductCategoryAttributes.entity.js";

export async function seedCategoryAttributes() {
  const catRepo = AppDataSource.getRepository(ProductCategory);
  const typeRepo = AppDataSource.getRepository(AttributeType);
  const repo = AppDataSource.getRepository(CategoryAttributeType);

  const saree = await catRepo.findOneByOrFail({ name: "Sarees" });
  const color = await typeRepo.findOneByOrFail({ name: "Color" });
  const material = await typeRepo.findOneByOrFail({ name: "Material" });

  await repo.save([
    { category_id: saree.id, attribute_type_id: color.id },
    { category_id: saree.id, attribute_type_id: material.id },
  ]);
}

