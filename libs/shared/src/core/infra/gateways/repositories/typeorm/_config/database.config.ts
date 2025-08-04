import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { TypeORMUserModel } from '../_models/user.model';

dotenv.config();

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  url: process.env.DATABASE_URL,
  entities: [TypeORMUserModel],
  migrations: [path.join(__dirname, '../migrations/*.ts')],
  migrationsTableName: 'migrations',
  migrationsRun: true,
  // TODO: Define as false when we have migration strategy working properly
  synchronize: true,
};
