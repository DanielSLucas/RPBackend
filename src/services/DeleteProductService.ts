import { getCustomRepository } from 'typeorm';

import Product from '../models/Product';
import ProductsRepository from '../repositories/ProductsRepository';

class DeleteProductService {
  public async execute(product_id: string): Promise<void> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findProductById(product_id);

    if (!product) {
      throw new Error('Product not found');
    }

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
