

import { AppDataSource } from "../config/typeorm.config.js";
import { Order, ORD_CREATED } from "../entities/order.entity.js";
import { OrderItem } from "../entities/orderItem.entity.js";
import { Fulfillment, FS_INIT } from "../entities/fulfillment.entity.js";
import { Transaction, PM_UPI, PS_PAID } from "../entities/transaction.entity.js";
import { Product } from "../entities/product.entity.js";
import Supplier from "../entities/supplier.entity.js";
import { USERS } from "./constants.js";

export async function seedOrders() {
  await AppDataSource.transaction(async (trx) => {
    const productRepo = trx.getRepository(Product);
    const supplierRepo = trx.getRepository(Supplier);
    const orderRepo = trx.getRepository(Order);
    const itemRepo = trx.getRepository(OrderItem);
    const txRepo = trx.getRepository(Transaction);

    const product = (await productRepo.find({ take: 1 }))[0];
    const supplier = (await supplierRepo.find({ take: 1 }))[0];

    if (!product) throw new Error("No products found");
    if (!supplier) throw new Error("No suppliers found");

    // ---- transaction ----
    const transaction = await txRepo.save(
      txRepo.create({
        razorpay_id: `rzp_test_${Date.now()}`,
        amount: product.price * 2,
        currency: "INR",
        payment_method: PM_UPI,
        payment_status: PS_PAID,
      })
    );

    // ---- order item (CREATE via repo) ----
    const orderItem = itemRepo.create({
      product_id: product.id,
      product_name: product.name,
      product_public_id: product.public_id,
      currency: "INR",
      unit_price: product.price,
      quantity: 2,
      total_price: product.price * 2,
      attributes: {
        color: "Red",
        material: "Silk",
      },
    });

    // ---- fulfillment ----
    const fulfillment = trx.getRepository(Fulfillment).create({
      supplier_id: supplier.id,
      supplier,
      state: FS_INIT,
    });

    // ---- order ----
    const order = orderRepo.create({
      customer_id: USERS.C,
      order_status: ORD_CREATED,
      payment_id: transaction.id,
      tramsaction: transaction,
      items: [orderItem],
      fulfillments: [fulfillment],
    });

    await orderRepo.save(order);
  });

  console.log("✅ Orders seeded");
}

