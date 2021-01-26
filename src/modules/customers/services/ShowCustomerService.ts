import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

@injectable()
class ShowCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute(user_id: string): Promise<Customer | undefined> {
    const customer = await this.customersRepository.findById(user_id);

    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    return customer;
  }
}

export default ShowCustomerService;
