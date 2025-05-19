import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserRole implements MigrationInterface {
    name = 'UpdateUserRole1747612565000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.query(`
                ALTER TABLE users
                RENAME COLUMN role TO role_old
            `);

            await queryRunner.query(`
                ALTER TABLE users
                ADD COLUMN role TEXT NOT NULL DEFAULT '["User"]'
            `);

            await queryRunner.query(`
                UPDATE users
                SET role = json('["' || role_old || '"]')
            `);

            await queryRunner.query(`
                ALTER TABLE users
                DROP COLUMN role_old
            `);
        } catch (error) {
            console.error('Migration up error:', error);
            throw error;
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.query(`
                ALTER TABLE users
                ADD COLUMN role_old TEXT
              `);

            await queryRunner.query(`
                UPDATE users
                SET role_old = role[0]
            `);

            await queryRunner.query(`
                ALTER TABLE users
                DROP COLUMN role
              `);

            await queryRunner.query(`
                ALTER TABLE users
                RENAME COLUMN role_old TO role
              `);
        } catch (error) {
            console.error('Migration down error:', error);
            throw error;
        }
    }
}
