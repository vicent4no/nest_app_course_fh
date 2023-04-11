import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export enum ConnectionTypes {
  POSTGRES = 'postgres',
}

export default registerAs(
  ConnectionTypes.POSTGRES,
  (): TypeOrmModuleOptions => ({
    type: ConnectionTypes.POSTGRES,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
    host: process.env.DB_HOST || '',
    port: isNaN(Number(process.env.DB_PORT))
      ? 5432
      : Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME || '',
    synchronize: process.env.NODE_ENV !== 'prod',
    autoLoadEntities: process.env.NODE_ENV !== 'prod',
    logging: true,
    entities: [],
  }),
);
