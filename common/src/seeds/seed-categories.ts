import { AppDataSource } from "../config/typeorm.config.js";
import { ProductCategory } from "../entities/ProductCategory.entity.js";

export async function seedCategories() {
  const repo = AppDataSource.getRepository(ProductCategory);

  await repo.save([
    { name: "Sarees" },
    { name: "Kurtas" },
  ]);
}

