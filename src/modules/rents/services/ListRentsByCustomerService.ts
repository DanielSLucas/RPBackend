import { inject, injectable } from 'tsyringe';

import IRentsRepository from '../repositories/IRentsRepository';

import Rent from '../infra/typeorm/entities/Rent';
import AppError from '../../../shared/errors/AppError';
import ICustomersRepository from '../../customers/repositories/ICustomersRepository';

@injectable()
class ListRentsByCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('RentsRepository')
    private rentsRepository: IRentsRepository,
  ) {}

  public async execute(customer_id: string): Promise<Rent[]> {
    const customerExists = await this.customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError("Customer doesn't exist.", 400);
    }

    const rents = await this.rentsRepository.findByCustomer(customer_id);

    return rents;
  }
}

export default ListRentsByCustomerService;
