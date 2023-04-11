import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfiguration from './shared/config/database.configuration';
import apiConfiguration from './shared/config/api.configuration';
import { PostgresModule } from './shared/typeorm/postgres.module';
import { ProductsModule } from './api/products/products.module';
import { ProductImagesModule } from './api/product-images/product-images.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [apiConfiguration, databaseConfiguration],
    }),
    PostgresModule,
    ProductsModule,
    ProductImagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
