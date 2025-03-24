import { User } from '../users/users.entity';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(__dirname, '../../.env') });

const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User],
  migrations: [join(__dirname, '..', 'migration', '*{.ts,.js}')],
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: true,
  migrationsRun: true,
};

export const AppDataSource = new DataSource(dataSourceOptions);
