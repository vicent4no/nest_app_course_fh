import { IProductImage } from 'src/common/interfaces/products/product-images.interface';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductImage implements IProductImage {
  @PrimaryGeneratedColumn()
  id?: number | undefined;

  @Column('text')
  url: string;

  @ManyToOne<Product>(() => Product, (product) => product.productImages)
  product: Product;
}
