import { inject, injectable } from 'tsyringe';

import IRentsRepository from '../repositories/IRentsRepository';
import IRentalItemsRepository from '../repositories/IRentalItemsRepository';

import Rent from '../infra/typeorm/entities/Rent';
import RentalItem from '../infra/typeorm/entities/RentalItem';
import AppError from '../../../shared/errors/AppError';

interface Response {
  rent: Rent;
  rentedItems: RentalItem[];
}

@injectable()
class ShowRentService {
  constructor(
    @inject('RentsRepository')
    private rentsRepository: IRentsRepository,

    @inject('RentalItemsRepository')
    private rentalItemsRepository: IRentalItemsRepository,
  ) {}

  public async execute(rent_id: string): Promise<Response> {
    const rent = await this.rentsRepository.findById(rent_id);

    if (!rent) {
      throw new AppError("Rent doesn't exist.");
    }

    const rentedItems = await this.rentalItemsRepository.findByRent(rent_id);

    return {
      rent,
      rentedItems,
    };
  }
}

export default ShowRentService;
