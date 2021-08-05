import { inject, injectable } from 'tsyringe';
import Product, { ProductTypes } from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface Request {
  name: string;
  quantity: number;
  value: number;
  product_type: ProductTypes;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    name,
    quantity,
    value,
    product_type,
  }: Request): Promise<Product> {
    const product = await this.productsRepository.create({
      name,
      quantity,
      value,
      product_type,
    });

    return product;
  }
}

export default CreateProductService;
