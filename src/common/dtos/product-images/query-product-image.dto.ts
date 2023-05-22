import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, IsUUID } from 'class-validator';
import { IQueryProductImage } from 'src/common/interfaces/products/query-product-image.interface';
import { PaginationDTO } from '../pagination.dto';

export class QuerySingleProductImageDTO implements IQueryProductImage {
  // Query a single image of a product
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @IsPositive()
  id: number;
}

export class QueryAllProductImagesDTO
  extends PaginationDTO
  implements IQueryProductImage
{
  // Query all images of a product
  @Type(() => String)
  @IsOptional()
  @IsUUID()
  product: string;
}
