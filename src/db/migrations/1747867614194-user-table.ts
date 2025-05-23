import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable1747867614194 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user" (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                username varchar(255) NOT NULL,
                password_hash varchar(255) NOT NULL,
                CONSTRAINT users_pk_id PRIMARY KEY (id),
                CONSTRAINT users_un_username UNIQUE (username)
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS user;
        `);
  }
}
