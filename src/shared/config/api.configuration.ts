import { registerAs } from '@nestjs/config';
import { IAPIConfiguration } from '../interfaces/config/api-config.interface';

export enum APIAvailableVersions {
  V1 = 'v1',
}

export default registerAs(
  'api',
  (): IAPIConfiguration => ({
    PORT: isNaN(Number(process.env.API_PORT))
      ? 3000
      : Number(process.env.API_PORT),
    API_BASE_PATH: process.env.API_BASE_PATH ?? 'api',
  }),
);
