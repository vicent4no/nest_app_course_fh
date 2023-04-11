import { IProduct } from './product.interface';

export interface IProductImage {
  id?: number;
  url: string;
  // Relationship
  product: IProduct;
}
