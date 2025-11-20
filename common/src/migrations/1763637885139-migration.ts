import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1763637885139 implements MigrationInterface {
    name = 'Migration1763637885139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" bigint NOT NULL, "email" citext, "phone_number" character varying, "first_name" character varying NOT NULL, "last_name" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_01eea41349b6c9275aec646eee0" UNIQUE ("phone_number"), CONSTRAINT "CHK_c13175cba9d9e280da957e5931" CHECK (("email" IS NOT NULL OR "phone_number" IS NOT NULL)), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
