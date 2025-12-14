import { AppDataSource } from "../config/typeorm.config.js";
import Supplier from "../entities/supplier.entity.js";
import { USERS } from "./constants.js";

export async function seedSuppliers() {
  const repo = AppDataSource.getRepository(Supplier);

  await repo.save([
    {
      id: crypto.randomUUID(),
      sa_id: USERS.A,
      email: "supplier1@test.com",
      name: "Banarasi Textiles",
    },
    {
      id: crypto.randomUUID(),
      sa_id: USERS.B,
      email: "supplier2@test.com",
      name: "Kanchipuram Silks",
    },
  ]);
}

