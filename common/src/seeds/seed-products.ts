import { AppDataSource } from "../config/typeorm.config.js";
import { Product } from "../entities/product.entity.js";
import { ProductCategory } from "../entities/ProductCategory.entity.js";
import Supplier from "../entities/supplier.entity.js";

export async function seedProducts() {
  const productRepo = AppDataSource.getRepository(Product);
  const catRepo = AppDataSource.getRepository(ProductCategory);
  const supplierRepo = AppDataSource.getRepository(Supplier);

  const saree = await catRepo.findOneByOrFail({ name: "Sarees" });
  const supplier = await supplierRepo.findOneByOrFail({});

  await productRepo.save([
    {
      supplier_id: supplier.id,
      name: "Banarasi Silk Saree",
      price: 4500,
      stock: 20,
      images: ["https://img.test/saree1.jpg"],
      category_id: saree.id,
    },
  ]);
}

