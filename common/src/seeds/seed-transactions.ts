import { AppDataSource } from "../config/typeorm.config.js";
import { Transaction, PM_UPI, PS_PAID } from "../entities/transaction.entity.js";

export async function seedTransactions() {
  const repo = AppDataSource.getRepository(Transaction);

  await repo.save({
    razorpay_id: "razorpay_test_001",
    amount: 4500,
    payment_method: PM_UPI,
    payment_status: PS_PAID,
  });
}

