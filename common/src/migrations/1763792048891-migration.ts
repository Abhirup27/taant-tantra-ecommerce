import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1763792048891 implements MigrationInterface {
    name = 'Migration1763792048891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "pfp_image" text`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_4a55bd369bb278a646c2e4676a5" UNIQUE ("pfp_image")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_4a55bd369bb278a646c2e4676a5"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "pfp_image"`);
    }

}
