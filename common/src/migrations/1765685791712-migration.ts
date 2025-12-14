import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1765685791712 implements MigrationInterface {
    name = 'Migration1765685791712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order_items" ("id" SERIAL NOT NULL, "order_id" uuid NOT NULL, "product_id" uuid NOT NULL, "product_name" character varying NOT NULL, "product_public_id" character varying NOT NULL, "unit_price" integer NOT NULL, "quantity" integer NOT NULL, "total_price" integer NOT NULL, "attributes" jsonb, CONSTRAINT "PK_005269d8574e6fac0493715c308" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "fulfillment_ids"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "public_id" SET DEFAULT 'P_' || nextval('product_public_id_seq')`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_number" SET DEFAULT 'ORD_' || nextval('order_public_id_seq')`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_145532db85752b29c57d2b7b1f1" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_145532db85752b29c57d2b7b1f1"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_number" SET DEFAULT ('ORD_'|| nextval('order_public_id_seq'))`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "public_id" SET DEFAULT ('P_'|| nextval('product_public_id_seq'))`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "fulfillment_ids" uuid array NOT NULL`);
        await queryRunner.query(`DROP TABLE "order_items"`);
    }

}
