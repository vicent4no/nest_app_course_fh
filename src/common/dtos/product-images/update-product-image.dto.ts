import { PartialType } from '@nestjs/mapped-types';
import { CreateProductImageDTO } from './create-product-image.dto';

export class UpdateProductImageDTO extends PartialType(CreateProductImageDTO) {}
