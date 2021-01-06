import { getCustomRepository } from 'typeorm';

import Product from '../models/Product';
import ProductsRepository from '../repositories/ProductsRepository';

class ShowProductService {
  public async execute(product_id: string): Promise<Product | null> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findProductById(product_id);

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }
}

export default ShowProductService;
