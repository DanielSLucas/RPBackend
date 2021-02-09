import { inject, injectable } from 'tsyringe';

import IProductsRepository from '../../products/repositories/IProductsRepository';
import IRentalItemsRepository from '../repositories/IRentalItemsRepository';
import IRentsRepository from '../repositories/IRentsRepository';

import Rent from '../infra/typeorm/entities/Rent';
import AppError from '../../../shared/errors/AppError';

@injectable()
class ListRentsByProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('RentsRepository')
    private rentsRepository: IRentsRepository,

    @inject('RentalItemsRepository')
    private rentalItemsRepository: IRentalItemsRepository,
  ) {}

  public async execute(product_id: string): Promise<Rent[]> {
    const productExists = await this.productsRepository.findById(product_id);

    if (!productExists) {
      throw new AppError("Product doesn't exist.", 400);
    }

    const rentalItems = await this.rentalItemsRepository.findByProduct(
      product_id,
    );

    const rentIds = rentalItems.map(item => item.rent_id);

    const rents = await this.rentsRepository.findByIds(rentIds);

    return rents;
  }
}

export default ListRentsByProductService;
