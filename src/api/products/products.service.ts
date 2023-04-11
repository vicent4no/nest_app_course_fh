import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDTO } from 'src/common/dtos/pagination.dto';
import { CreateProductDto } from 'src/common/dtos/products/create-product.dto';
import { QueryProductDTO } from 'src/common/dtos/products/query-products.dto';
import { UpdateProductDto } from 'src/common/dtos/products/update-product.dto';
import { Product } from 'src/common/entities/products/product.entity';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  constructor(
    @InjectRepository(Product)
    private readonly products: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.products.create(createProductDto);
      await this.products.save(product);
      return product;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findAll(paginationDTO: PaginationDTO) {
    const { limit, offset } = paginationDTO;
    const foundProducts = await this.products.find({
      take: limit,
      skip: offset,
    });
    if (!foundProducts.length) throw new EntityNotFoundError(Product, {});
    return foundProducts;
  }

  async findOne(queryProductDTO: QueryProductDTO) {
    const { id, slug } = queryProductDTO;
    if (id) {
      return await this.products.findOneByOrFail({ id });
    }
    if (slug) {
      return await this.products.findOneByOrFail({ slug });
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.products.preload({ id, ...updateProductDto });
    if (!product) throw new EntityNotFoundError(Product, { id });
    return await this.products.save(product);
  }

  async remove(queryProductDTO: QueryProductDTO) {
    const { id, slug } = queryProductDTO;
    if (id) {
      return await this.products.delete({ id });
    }
    if (slug) {
      return await this.products.delete({ slug });
    }
  }
}
