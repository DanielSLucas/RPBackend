import { getCustomRepository } from 'typeorm';

import Product from '../models/Product';
import ProductsRepository from '../repositories/ProductsRepository';

interface Request {
  name: string;
  quantity: number;
  value: number;
  product_type: 'Bolos' | 'Arranjos' | 'Outros';
}

class CreateProductService {
  public async execute({
    name,
    quantity,
    value,
    product_type,
  }: Request): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.create({
      name,
      quantity,
      value,
      product_type,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
