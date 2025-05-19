import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserStatus implements MigrationInterface {
    name = 'UpdateUserStatus1747612745000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.query(`
                ALTER TABLE users
                RENAME COLUMN status TO status_old
            `);

            await queryRunner.query(`
                ALTER TABLE users
                ADD COLUMN status TEXT CHECK(status IN ('Enabled','Disabled','Deleted')) NULL
            `);

            await queryRunner.query(`
                UPDATE users
                SET status = 'Enabled'
            `);

            await queryRunner.query(`
                ALTER TABLE users
                DROP COLUMN status_old
            `);

            await queryRunner.query(`
                INSERT OR IGNORE INTO users (username, role, status) VALUES
                ('deleted_user', '["User"]', 'Deleted')
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
                ADD COLUMN status_old INTEGER
              `);

            await queryRunner.query(`
                UPDATE users
                SET status_old = status
            `);

            await queryRunner.query(`
                ALTER TABLE users
                DROP COLUMN status
              `);

            await queryRunner.query(`
                ALTER TABLE users
                RENAME COLUMN status_old TO status
              `);
        } catch (error) {
            console.error('Migration down error:', error);
            throw error;
        }
    }
}
