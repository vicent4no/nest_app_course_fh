import {
  applyDecorators,
  Controller,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TypeORMFilter } from '../filters/type-orm-exception.filter';

export function ApiController(version: string, path: string) {
  return applyDecorators(
    UseFilters(TypeORMFilter),
    UsePipes(
      new ValidationPipe({
        forbidNonWhitelisted: true,
        transformOptions: { enableImplicitConversion: false },
      }),
    ),
    Controller(`${process.env.API_BASE_PATH ?? 'api'}/${version}/${path}`),
  );
}
