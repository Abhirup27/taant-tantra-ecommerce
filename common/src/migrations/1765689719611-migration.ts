import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1765689719611 implements MigrationInterface {
    name = 'Migration1765689719611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_cdb99c05982d5191ac8465ac010"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_f1d359a55923bb45b057fbdab0d"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP COLUMN "orderId"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "public_id" SET DEFAULT 'P_' || nextval('product_public_id_seq')`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_number" SET DEFAULT 'ORD_' || nextval('order_public_id_seq')`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_145532db85752b29c57d2b7b1f1" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_9263386c35b6b242540f9493b00" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_9263386c35b6b242540f9493b00"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_145532db85752b29c57d2b7b1f1"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_number" SET DEFAULT ('ORD_'|| nextval('order_public_id_seq'))`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "public_id" SET DEFAULT ('P_'|| nextval('product_public_id_seq'))`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD "productId" uuid`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD "orderId" uuid`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_f1d359a55923bb45b057fbdab0d" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_cdb99c05982d5191ac8465ac010" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

}
