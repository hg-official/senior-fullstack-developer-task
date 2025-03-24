import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialUserRoleSetup1680000000000 implements MigrationInterface {
  name = 'InitialUserRoleSetup1680000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(`
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(255) NOT NULL UNIQUE,
                    role VARCHAR(50) NOT NULL DEFAULT 'User',
                    status BOOLEAN NULL
                ) ENGINE=InnoDB;
            `);

      await queryRunner.query(`
                INSERT INTO users (username, role, status) VALUES
                ('admin_user', 'Admin', true),
                ('regular_user', 'User', true),
                ('editor_user', 'Editor', true)
                ON DUPLICATE KEY UPDATE username=username;
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
