import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';

import Rent, {
  PaymentStatus,
  PaymentWays,
} from '../infra/typeorm/entities/Rent';

import IRentsRepository from '../repositories/IRentsRepository';
import IRentalItemsRepository from '../repositories/IRentalItemsRepository';

import { RentItem } from '../dtos/ICreateRentDTO';
import { IDateProvider } from '../providers/dateProvider/IDateProvider';

interface Request {
  customer_id: string;
  address_id: string;
  rent_date: Date;
  payment_way: PaymentWays;
  payment_status: PaymentStatus;
  total_value: number;
  rental_items: RentItem[];
}

@injectable()
class UpdateRentService {
  constructor(
    @inject('RentsRepository')
    private rentsRepository: IRentsRepository,

    @inject('RentalItemsRepository')
    private rentalItemsRepository: IRentalItemsRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  public async execute(
    rent_id: string,
    {
      customer_id,
      address_id,
      rent_date,
      rental_items,
      payment_status,
      payment_way,
      total_value,
    }: Request,
  ): Promise<Rent> {
    const rentExists = await this.rentsRepository.findById(rent_id);

    if (!rentExists) {
      throw new AppError("Rent doesn't exist.", 400);
    }

    if (this.dateProvider.isPastDate(rent_date)) {
      throw new AppError("You can't create a rent in a past date");
    }

    const rentedItems = await this.rentalItemsRepository.findByRent(
      rentExists.id,
    );

    const rent = await this.rentsRepository.update(rentExists, {
      customer_id,
      address_id,
      rent_date,
      payment_way,
      payment_status,
      total_value,
    });

    await this.rentalItemsRepository.update(rentedItems, rental_items);

    return rent;
  }
}

export default UpdateRentService;
