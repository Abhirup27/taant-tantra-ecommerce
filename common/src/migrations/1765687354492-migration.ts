import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1765687354492 implements MigrationInterface {
    name = 'Migration1765687354492'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fulfillments" DROP CONSTRAINT "FK_ad58a06518e16ce0aa37ba1566e"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "public_id" SET DEFAULT 'P_' || nextval('product_public_id_seq')`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_number" SET DEFAULT 'ORD_' || nextval('order_public_id_seq')`);
        await queryRunner.query(`ALTER TABLE "fulfillments" ADD CONSTRAINT "FK_ad58a06518e16ce0aa37ba1566e" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fulfillments" DROP CONSTRAINT "FK_ad58a06518e16ce0aa37ba1566e"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_number" SET DEFAULT ('ORD_'|| nextval('order_public_id_seq'))`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "public_id" SET DEFAULT ('P_'|| nextval('product_public_id_seq'))`);
        await queryRunner.query(`ALTER TABLE "fulfillments" ADD CONSTRAINT "FK_ad58a06518e16ce0aa37ba1566e" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
