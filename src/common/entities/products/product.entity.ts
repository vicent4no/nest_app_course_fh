import { IProduct } from 'src/common/interfaces/products/product.interface';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductImage } from './product-images.entity';

@Entity()
export class Product implements IProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  title: string;

  @Column('float')
  price: number;

  @Column('text')
  description: string;

  @Column('text', {
    unique: true,
  })
  slug: string;

  // Poner en tabla aparte!
  @Column('int')
  stock: number;

  // Poner en tabla aparte!
  @Column('text', { array: true })
  sizes: string[];

  // Podrian ser una relacion tranquilamente
  @Column('text')
  gender: string;

  @OneToMany<ProductImage>(
    () => ProductImage,
    (productImage) => productImage.product,
    { cascade: true },
  )
  productImages?: ProductImage[];
}
