import { User } from '../users/users.entity';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'PWD',
  database: process.env.DB_NAME || 'test',
  entities: [User],
  //entities: ['**/*.entity.ts'],
  migrations: ['src/migration/*.ts'],
  synchronize: false, // ⚠️ Always false in production
  logging: true,
});
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
