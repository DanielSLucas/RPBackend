import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IProductsRepository from '../repositories/IProductsRepository';

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(product_id: string): Promise<void> {
    const productExists = await this.productsRepository.findById(product_id);

    if (!productExists) {
      throw new AppError('Product not found', 404);
    }

    await this.productsRepository.delete(productExists);
  }
}

export default DeleteProductService;
