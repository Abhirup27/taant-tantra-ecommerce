import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1765640655869 implements MigrationInterface {
    name = 'Migration1765640655869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_a75bfadcd8291a0538ab7abfdcf" UNIQUE ("name"), CONSTRAINT "PK_7069dac60d88408eca56fdc9e0c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category_attribute_types" ("id" SERIAL NOT NULL, "category_id" integer NOT NULL, "attribute_type_id" integer NOT NULL, CONSTRAINT "PK_e31bb9e6c5e49c0525ff23d75fa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attribute_types" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_8b86ce83fe0798dcfc84dc95d82" UNIQUE ("name"), CONSTRAINT "PK_79748fd1ac231a2e51ef55db32c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attribute_values" ("id" SERIAL NOT NULL, "type_id" integer NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_3babf93d1842d73e7ba849c0160" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_attribute_values" ("id" SERIAL NOT NULL, "product_id" uuid NOT NULL, "attribute_value_id" integer NOT NULL, CONSTRAINT "PK_b124baf1272037deac1c21cffe1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD "category_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "public_id" SET DEFAULT 'P_' || nextval('product_public_id_seq')`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_number" SET DEFAULT 'ORD_' || nextval('order_public_id_seq')`);
        await queryRunner.query(`ALTER TABLE "category_attribute_types" ADD CONSTRAINT "FK_afe1dc44c1da4fa8583fe131d61" FOREIGN KEY ("category_id") REFERENCES "product_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category_attribute_types" ADD CONSTRAINT "FK_ae592e69fa7086d40143e3d9802" FOREIGN KEY ("attribute_type_id") REFERENCES "attribute_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attribute_values" ADD CONSTRAINT "FK_6a6204f89c9162a88f8df4770f5" FOREIGN KEY ("type_id") REFERENCES "attribute_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_attribute_values" ADD CONSTRAINT "FK_61655fe2f6d179eced519392ced" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_attribute_values" ADD CONSTRAINT "FK_5b1f7c69bb70bbf112f907c3187" FOREIGN KEY ("attribute_value_id") REFERENCES "attribute_values"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "product_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`);
        await queryRunner.query(`ALTER TABLE "product_attribute_values" DROP CONSTRAINT "FK_5b1f7c69bb70bbf112f907c3187"`);
        await queryRunner.query(`ALTER TABLE "product_attribute_values" DROP CONSTRAINT "FK_61655fe2f6d179eced519392ced"`);
        await queryRunner.query(`ALTER TABLE "attribute_values" DROP CONSTRAINT "FK_6a6204f89c9162a88f8df4770f5"`);
        await queryRunner.query(`ALTER TABLE "category_attribute_types" DROP CONSTRAINT "FK_ae592e69fa7086d40143e3d9802"`);
        await queryRunner.query(`ALTER TABLE "category_attribute_types" DROP CONSTRAINT "FK_afe1dc44c1da4fa8583fe131d61"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_number" SET DEFAULT ('ORD_'|| nextval('order_public_id_seq'))`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "public_id" SET DEFAULT ('P_'|| nextval('product_public_id_seq'))`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "category_id"`);
        await queryRunner.query(`DROP TABLE "product_attribute_values"`);
        await queryRunner.query(`DROP TABLE "attribute_values"`);
        await queryRunner.query(`DROP TABLE "attribute_types"`);
        await queryRunner.query(`DROP TABLE "category_attribute_types"`);
        await queryRunner.query(`DROP TABLE "product_categories"`);
    }

}
