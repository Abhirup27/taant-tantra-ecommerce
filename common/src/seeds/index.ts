import { AppDataSource } from "../config/typeorm.config.js";

import { seedSuppliers } from "./seed-suppliers.js";
import { seedCategories } from "./seed-categories.js";
import { seedAttributeTypes } from "./seed-attribute-types.js";
import { seedAttributeValues } from "./seed-attribute-values.js";
import { seedCategoryAttributes } from "./seed-category-attributes.js";
import { seedProducts } from "./seed-products.js";
import { seedProductAttributes } from "./seed-product-attributes.js";
import { seedTransactions } from "./seed-transactions.js";
import { seedOrders } from "./seed-orders.js";
import { seedFulfillments } from "./seed-fulfillments.js";

async function run() {
  await AppDataSource.initialize();

  await seedSuppliers();
  await seedCategories();
  await seedAttributeTypes();
  await seedAttributeValues();
  await seedCategoryAttributes();
  await seedProducts();
  await seedProductAttributes();
  await seedTransactions();
  await seedOrders();
  await seedFulfillments();

  console.log("✅ Seeding complete");
  process.exit(0);
}

run().catch(console.error);

