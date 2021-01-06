import { getCustomRepository } from 'typeorm';

import Product from '../models/Product';
import ProductsRepository from '../repositories/ProductsRepository';

interface Request {
  product_id: string;
  name: string;
  quantity: number;
  value: number;
  product_type: 'Bolos' | 'Arranjos' | 'Outros';
}

class UpdateProductService {
  public async execute({
    product_id,
    name,
    quantity,
    value,
    product_type,
  }: Request): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findProductById(product_id);

    if (!product) {
      throw new Error('Product not found');
    }

    Object.assign(product, {
      name,
      quantity,
      value,
      product_type,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
