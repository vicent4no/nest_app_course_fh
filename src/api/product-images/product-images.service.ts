import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateProductImageDTO,
  Product,
  ProductImage,
  QueryAllProductImagesDTO,
  QuerySingleProductImageDTO,
  UpdateProductImageDTO,
} from 'src/common';

import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class ProductImagesService {
  private readonly logger = new Logger(ProductImagesService.name);
  constructor(
    @InjectRepository(Product)
    private readonly products: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImages: Repository<ProductImage>,
  ) {}

  async create(createProductImageDto: CreateProductImageDTO) {
    try {
      const { product: id } = createProductImageDto;
      const product = await this.products.findOneByOrFail({ id });
      const productImage = this.productImages.create({
        ...createProductImageDto,
        product,
      });

      await this.productImages.save(productImage);

      return productImage;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findAll(queryAllProductImagesDTO: QueryAllProductImagesDTO) {
    const { limit, offset, product } = queryAllProductImagesDTO;

    const foundProductImages = await this.products.find({
      take: limit,
      skip: offset,
      where: { id: product },
    });

    if (!foundProductImages.length)
      throw new EntityNotFoundError(ProductImage, {});

    return foundProductImages;
  }

  async findOne(queryProductImageDTO: QuerySingleProductImageDTO) {
    const { id } = queryProductImageDTO;
    return await this.productImages.findOneByOrFail({ id });
  }

  async update(id: number, updateProductImageDto: UpdateProductImageDTO) {
    const product = await this.products.findOneByOrFail({
      id: updateProductImageDto.product,
    });

    const updatedData = {
      id,
      ...updateProductImageDto,
      product,
    };

    const productImage = await this.productImages.preload({ ...updatedData });

    if (!productImage) throw new EntityNotFoundError(ProductImage, { id });

    return await this.productImages.save(productImage);
  }

  async remove(queryProductImageDTO: QuerySingleProductImageDTO) {
    const { id } = queryProductImageDTO;
    return await this.productImages.delete({ id });
  }
}
