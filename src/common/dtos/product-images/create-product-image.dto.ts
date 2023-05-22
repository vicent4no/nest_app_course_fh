import { IProductImage } from '../../interfaces/products/product-images.interface';
import { IsUUID, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductImageDTO implements Pick<IProductImage, 'url'> {
  // Type is picked here so that IProduct is not needed in the DTO entirely.
  @Type(() => String)
  @IsUrl()
  url: string;

  @Type(() => String)
  @IsUUID()
  product: string;
}
