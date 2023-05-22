import {
  ApiController,
  CreateProductImageDTO,
  QueryAllProductImagesDTO,
  QuerySingleProductImageDTO,
  UpdateProductImageDTO,
} from 'src/common';
import { APIAvailableVersions } from 'src/shared';
import { ProductImagesService } from './product-images.service';
import {
  Body,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@ApiController(APIAvailableVersions.V1, 'product-images')
export class ProductImagesController {
  constructor(private readonly productImagesService: ProductImagesService) {}

  @Post()
  async create(@Body() createProductImageDTO: CreateProductImageDTO) {
    return this.productImagesService.create(createProductImageDTO);
  }

  @Get()
  async findAll(@Query() queryAllProductImagesDTO: QueryAllProductImagesDTO) {
    return this.productImagesService.findAll(queryAllProductImagesDTO);
  }

  @Get('findBy')
  async findOne(
    @Query() querySingleProductImageDTO: QuerySingleProductImageDTO,
  ) {
    return this.productImagesService.findOne(querySingleProductImageDTO);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductImageDTO: UpdateProductImageDTO,
  ) {
    return this.productImagesService.update(id, updateProductImageDTO);
  }

  @Delete()
  async remove(
    @Query() querySingleProductImageDTO: QuerySingleProductImageDTO,
  ) {
    return this.productImagesService.remove(querySingleProductImageDTO);
  }
}
