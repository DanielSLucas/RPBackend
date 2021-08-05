import { ProductTypes } from '../infra/typeorm/entities/Product';

export default interface ICreateProductDTO {
  name: string;
  quantity: number;
  value: number;
  product_type: ProductTypes;
}
