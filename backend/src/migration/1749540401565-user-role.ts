import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UserRole1749540401565 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'role',
      new TableColumn({
        name: 'roles',
        type: 'json',
        isNullable: true,
      }),
    );

    await queryRunner.query(`
      UPDATE "users"
      SET "roles" = CASE
        WHEN "roles" IS NULL THEN '[]'
        WHEN json_valid("roles") THEN "roles"
        ELSE json_array("roles")
      END;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'roles',
      new TableColumn({
        name: 'role',
        type: 'text',
        isNullable: true,
      }),
    );

    await queryRunner.query(`
      UPDATE "users"
      SET "role" = json_extract("role", '$[0]')
      WHERE "role" IS NOT NULL;
    `);
  }
}
