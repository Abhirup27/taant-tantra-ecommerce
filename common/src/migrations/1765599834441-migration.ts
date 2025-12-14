import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1765599834441 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //Create sequence
        await queryRunner.query(`
      CREATE SEQUENCE IF NOT EXISTS order_public_id_seq START 1;
    `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop the sequence
        await queryRunner.query(`
      DROP SEQUENCE IF EXISTS order_public_id_seq;
    `);

    }

}
