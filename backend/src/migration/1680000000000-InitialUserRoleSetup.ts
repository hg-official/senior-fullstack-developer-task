import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserRole, UserStatus } from '../users/users.entity';

export class InitialUserRoleSetup1680000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      // Drop table if exists to ensure clean state
      await queryRunner.query(`DROP TABLE IF EXISTS users`);

      // Create table
      await queryRunner.query(`
                CREATE TABLE users (
                     id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                    username TEXT NOT NULL UNIQUE,
                    role TEXT NOT NULL DEFAULT '${UserRole.REGULAR}',
                    status TEXT NOT NULL DEFAULT '${UserStatus.ENABLED}'
                )
            `);

      // Insert initial data with proper string values
      await queryRunner.query(`
                INSERT INTO users (username, role, status) VALUES
                ('admin_user', '${UserRole.ADMIN}', '${UserStatus.ENABLED}'),
                ('regular_user', '${UserRole.REGULAR}', '${UserStatus.ENABLED}'),
                ('editor_user', '${UserRole.EDITOR}', '${UserStatus.ENABLED}'),
                ('deleted_user', '${UserRole.REGULAR}', '${UserStatus.DELETED}'),
                ('disabled_user', '${UserRole.REGULAR}', '${UserStatus.DISABLED}')
            `);
    } catch (error) {
      console.error('Migration up error:', error);
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(`DROP TABLE IF EXISTS users`);
    } catch (error) {
      console.error('Migration down error:', error);
      throw error;
    }
  }
}
