import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { IQueryProduct } from 'src/common/interfaces/products/query-product.interface';

export class QueryProductDTO implements IQueryProduct {
  @IsOptional()
  @Type(() => String)
  @IsUUID()
  id?: string;

  @IsOptional()
  @Type(() => String)
  @IsString()
  slug?: string;
}
