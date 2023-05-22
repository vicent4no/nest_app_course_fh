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
import { AvailableGenders, Sizes } from 'src/common/constants';
import { IProduct } from 'src/common/interfaces';

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
  @IsEnum(Sizes, { each: true })
  sizes: Sizes[];

  @Type(() => String)
  @IsEnum(AvailableGenders)
  @IsString()
  gender: string;
}
