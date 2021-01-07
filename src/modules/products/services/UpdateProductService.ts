import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface Request {
  product_id: string;
  name: string;
  quantity: number;
  value: number;
  product_type: 'Bolos' | 'Arranjos' | 'Outros';
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    product_id,
    name,
    quantity,
    value,
    product_type,
  }: Request): Promise<Product> {
    const productExists = await this.productsRepository.findById(product_id);

    if (!productExists) {
      throw new Error('Product not found');
    }

    const updatedProduct = await this.productsRepository.update(productExists, {
      name,
      quantity,
      value,
      product_type,
    });

    return updatedProduct;
  }
}

export default UpdateProductService;
