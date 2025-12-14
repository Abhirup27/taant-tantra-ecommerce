import { AppDataSource } from "../config/typeorm.config.js";
import { Fulfillment, FS_INIT } from "../entities/fulfillment.entity.js";
import { Order } from "../entities/order.entity.js";
import Supplier from "../entities/supplier.entity.js";

export async function seedFulfillments() {
  const repo = AppDataSource.getRepository(Fulfillment);
  const order = await AppDataSource.getRepository(Order).findOneByOrFail({});
  const supplier = await AppDataSource.getRepository(Supplier).findOneByOrFail({});

  await repo.save({
    order_id: order.id,
    supplier_id: supplier.id,
    state: FS_INIT,
  });
}

