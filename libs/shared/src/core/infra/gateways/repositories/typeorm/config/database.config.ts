import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

import { TypeORMUserModel } from '../models/user.model';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  url: process.env.DATABASE_URL,
  entities: [TypeORMUserModel],
  migrations: [path.join(__dirname, '../migrations/*.ts')],
  migrationsTableName: 'migrations',
  migrationsRun: true,
  synchronize: false,
};
