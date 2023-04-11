import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiController } from 'src/common/decorators/api-controller.decorator';
import { CreateProductDto } from 'src/common/dtos/products/create-product.dto';
import { UpdateProductDto } from 'src/common/dtos/products/update-product.dto';
import { ProductsService } from './products.service';
import { APIAvailableVersions } from '../../shared/config/api.configuration';
import { QueryProductDTO } from 'src/common/dtos/products/query-products.dto';
import { PaginationDTO } from 'src/common/dtos/pagination.dto';

@ApiController(APIAvailableVersions.V1, 'products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(@Query() paginationDTO: PaginationDTO) {
    return this.productsService.findAll(paginationDTO);
  }

  @Get('findBy')
  async findOne(@Query() queryProductDTO: QueryProductDTO) {
    return this.productsService.findOne(queryProductDTO);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete()
  async remove(@Query() queryProductDTO: QueryProductDTO) {
    return this.productsService.remove(queryProductDTO);
  }
}
