import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';

import Rent from '../infra/typeorm/entities/Rent';

import IRentsRepository from '../repositories/IRentsRepository';
import IRentalItemsRepository from '../repositories/IRentalItemsRepository';
import ICustomersRepository from '../../customers/repositories/ICustomersRepository';
import IAddressesRepository from '../../addresses/repositories/IAddressesRepository';

import { RentItem } from '../dtos/ICreateRentDTO';
import { IDateProvider } from '../providers/dateProvider/IDateProvider';

interface Request {
  customer_id: string;
  address_id: string;
  rent_date: Date;
  payment_way: 'Dinheiro' | 'Transferência';
  payment_status: 'Pago' | 'Pendente' | 'Parcial';
  total_value: number;
  rental_items: RentItem[];
}

@injectable()
class CreateRentService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,

    @inject('RentsRepository')
    private rentsRepository: IRentsRepository,

    @inject('RentalItemsRepository')
    private rentalItemsRepository: IRentalItemsRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  public async execute({
    customer_id,
    address_id,
    rent_date,
    rental_items,
    payment_status,
    payment_way,
    total_value,
  }: Request): Promise<Rent> {
    const customerExists = await this.customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError("Customer doesn't exist.", 400);
    }

    const addressExists = await this.addressesRepository.findById(address_id);

    if (!addressExists) {
      throw new AppError("Address doesn't exist.", 400);
    }

    if (this.dateProvider.isPastDate(rent_date)) {
      throw new AppError("You can't create a rent in a past date");
    }

    const rent = await this.rentsRepository.create({
      customer_id,
      address_id,
      rent_date,
      payment_way,
      payment_status,
      total_value,
    });

    await this.rentalItemsRepository.create(rental_items, rent.id);

    return rent;
  }
}

export default CreateRentService;
