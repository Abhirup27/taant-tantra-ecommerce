import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1765640088111 implements MigrationInterface {
    name = 'Migration1765640088111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."transactions_payment_method_enum" AS ENUM('cod', 'debit', 'credit', 'net banking', 'upi', 'wallet', 'bank transfer')`);
        await queryRunner.query(`CREATE TYPE "public"."transactions_payment_status_enum" AS ENUM('unpaid', 'paid', 'processing', 'refunded')`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "razorpay_id" character varying NOT NULL, "currency" character varying(3) NOT NULL DEFAULT 'INR', "amount" integer NOT NULL, "payment_method" "public"."transactions_payment_method_enum" NOT NULL, "payment_status" "public"."transactions_payment_status_enum" NOT NULL, "refund" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_279cf67b5df896a0aabb0c34932" UNIQUE ("razorpay_id"), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "suppliers" ("id" uuid NOT NULL, "sa_id" uuid NOT NULL, "email" citext, "phone_number" character varying, "name" character varying NOT NULL, CONSTRAINT "UQ_66181e465a65c2ddcfa9c00c9c7" UNIQUE ("email"), CONSTRAINT "UQ_a290dcf6cde0812fe9b465c71a1" UNIQUE ("phone_number"), CONSTRAINT "REL_9e4070d84deb995a51515fc2f1" UNIQUE ("sa_id"), CONSTRAINT "PK_b70ac51766a9e3144f778cfe81e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "public_id" character varying NOT NULL DEFAULT 'P_' || nextval('product_public_id_seq'), "supplier_id" uuid NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "currency" character varying(3) NOT NULL DEFAULT 'INR', "stock" integer NOT NULL DEFAULT '0', "description" text, "images" text array NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ratings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "p_id" uuid NOT NULL, CONSTRAINT "PK_0f31425b073219379545ad68ed9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."fulfillments_state_enum" AS ENUM('initiated', 'on the way', 'shipped', 'failed', 'refunded')`);
        await queryRunner.query(`CREATE TABLE "fulfillments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "consignment_id" character varying, "order_id" uuid NOT NULL, "supplier_id" uuid NOT NULL, "state" "public"."fulfillments_state_enum" NOT NULL DEFAULT 'initiated', "refunded" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_d890cbf9a0861c6a6263375db9c" UNIQUE ("consignment_id"), CONSTRAINT "PK_cb1805f0398d3d001737de76df3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."orders_order_status_enum" AS ENUM('created', 'pending', 'shipped', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order_number" character varying NOT NULL DEFAULT 'ORD_' || nextval('order_public_id_seq'), "customer_id" uuid NOT NULL, "order_status" "public"."orders_order_status_enum" NOT NULL, "payment_id" uuid NOT NULL, "fulfillment_ids" uuid array NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_75eba1c6b1a66b09f2a97e6927b" UNIQUE ("order_number"), CONSTRAINT "UQ_5b3e94bd2aedc184f9ad8c10439" UNIQUE ("payment_id"), CONSTRAINT "REL_5b3e94bd2aedc184f9ad8c1043" UNIQUE ("payment_id"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_type_enum" AS ENUM('customer', 'admin', 'super admin', 'Owner', 'dev ops')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "type" "public"."user_type_enum" DEFAULT 'customer'`);
        await queryRunner.query(`ALTER TABLE "suppliers" ADD CONSTRAINT "FK_9e4070d84deb995a51515fc2f1c" FOREIGN KEY ("sa_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD CONSTRAINT "FK_9f985195526e56d07799e69d704" FOREIGN KEY ("p_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fulfillments" ADD CONSTRAINT "FK_ad58a06518e16ce0aa37ba1566e" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fulfillments" ADD CONSTRAINT "FK_43e8bdd9ba5c152b27724438f40" FOREIGN KEY ("supplier_id") REFERENCES "suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9" FOREIGN KEY ("customer_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_5b3e94bd2aedc184f9ad8c10439" FOREIGN KEY ("payment_id") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_5b3e94bd2aedc184f9ad8c10439"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9"`);
        await queryRunner.query(`ALTER TABLE "fulfillments" DROP CONSTRAINT "FK_43e8bdd9ba5c152b27724438f40"`);
        await queryRunner.query(`ALTER TABLE "fulfillments" DROP CONSTRAINT "FK_ad58a06518e16ce0aa37ba1566e"`);
        await queryRunner.query(`ALTER TABLE "ratings" DROP CONSTRAINT "FK_9f985195526e56d07799e69d704"`);
        await queryRunner.query(`ALTER TABLE "suppliers" DROP CONSTRAINT "FK_9e4070d84deb995a51515fc2f1c"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."user_type_enum"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TYPE "public"."orders_order_status_enum"`);
        await queryRunner.query(`DROP TABLE "fulfillments"`);
        await queryRunner.query(`DROP TYPE "public"."fulfillments_state_enum"`);
        await queryRunner.query(`DROP TABLE "ratings"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "suppliers"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_payment_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_payment_method_enum"`);
    }

}
