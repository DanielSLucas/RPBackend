import { uuid } from 'uuidv4';

class Product {
  id: string;

  name: string;

  quantity: number;

  value: number;

  type_of_product: string;

  created_at: Date;

  updated_at: Date;
}

export default Product;
