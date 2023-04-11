import { IProductImage } from './product-images.interface';

export interface IProduct {
  id?: string;
  title: string;
  price: number;
  description: string;
  slug: string;

  // Poner en tabla aparte!
  stock: number;

  // ver si poner en otra tabla
  sizes: string[];

  // podria ser aparte
  gender: string;

  // Relaciones
  images?: IProductImage;
}
