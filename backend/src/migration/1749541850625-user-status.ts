import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UserStatus1749541850625 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'status',
      new TableColumn({
        name: 'status',
        type: 'text',
        isNullable: false,
      }),
    );

    await queryRunner.query(`
      UPDATE "users"
      SET "status" = CASE
        WHEN "status" = 1 THEN 'Enabled'
        WHEN "status" = 2 THEN 'Disabled'
        WHEN "status" = 3 THEN 'Deleted'
        ELSE 'Enabled'
      END;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      UPDATE "users"
      SET "status" = CASE
        WHEN "status" = 'Enabled' THEN 1
        WHEN "status" = 'Disabled' THEN 2
        WHEN "status" = 'Deleted' THEN 3
        ELSE 1
      END;
    `);

    await queryRunner.changeColumn(
      'users',
      'status',
      new TableColumn({
        name: 'status',
        type: 'int',
        isNullable: false,
      }),
    );
  }
}
