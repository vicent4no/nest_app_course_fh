import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImage } from 'src/common/entities/products/product-images.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductImagesService {
  private readonly logger = new Logger(ProductImagesService.name);
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImages: Repository<ProductImage>,
  ) {}
}
