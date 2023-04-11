import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { AvailableGenders } from 'src/common/constants/available-genders.constant';
import { IProduct } from 'src/common/interfaces/products/product.interface';

export class CreateProductDto implements IProduct {
  @Type(() => String)
  @IsString()
  @MinLength(3)
  title: string;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price: number;

  @Type(() => String)
  @IsString()
  description: string;

  @Type(() => String)
  @IsString()
  @MinLength(3)
  @Transform(({ value }) =>
    value.toLowerCase().replaceAll(' ', '_').replaceAll("'", ''),
  )
  slug: string;

  // Poner en tabla aparte!
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  stock: number;

  @Type(() => Array)
  @IsArray()
  @IsString({ each: true })
  sizes: string[];

  @Type(() => String)
  @IsEnum(AvailableGenders)
  @IsString()
  gender: string;
}
