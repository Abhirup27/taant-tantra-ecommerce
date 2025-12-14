import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export const PS_UNPAID = "unpaid";
export const PS_PAID = "paid";
export const PS_PROCESSING = "processing";
export const PS_REFUNDED = "refunded";

export const PAYMENT_STATUS = [
  PS_UNPAID, PS_PAID, PS_PROCESSING, PS_REFUNDED
] as const;

export type PaymentStatus = typeof PAYMENT_STATUS[number];

export const PM_COD = "cod";
export const PM_DEBIT = "debit";
export const PM_CREDIT = "credit";
export const PM_NET_B = "net banking";
export const PM_UPI = "upi";
export const PM_WALLET = "wallet";
export const PM_B_T = "bank transfer";

export const PAYMENT_METHOD = [
  PM_COD, PM_DEBIT, PM_CREDIT, PM_NET_B, PM_UPI, PM_WALLET, PM_B_T
] as const;

export type PaymentMethod = typeof PAYMENT_METHOD[number];


@Entity('transactions')
export class Transaction {

  @PrimaryGeneratedColumn('uuid')
  id!: string;


  @Column({
    nullable: false,
    unique: true,
    type: 'varchar'
  })
  razorpay_id!: string;


  @Column({ type: "varchar", length: 3, default: "INR" })
  currency!: string;

  @Column({ type: "integer", nullable: false })
  amount!: number;

  @Column({
    type: 'enum',
    enum: PAYMENT_METHOD,
    nullable: false
  })
  payment_method!: PaymentMethod;

  @Column({
    type: 'enum',
    enum: PAYMENT_STATUS,
    nullable: false
  })
  payment_status!: PaymentStatus;

  @Column({
    type: 'boolean',
    default: false
  })
  refund!: boolean;

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updated_at!: Date;


}
