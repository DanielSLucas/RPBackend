import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import ICustomersRepository from '../repositories/ICustomersRepository';

@injectable()
class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute(user_id: string): Promise<void> {
    const customerExists = await this.customersRepository.findById(user_id);

    if (!customerExists) {
      throw new AppError("Customer doesn't exists.", 400);
    }

    await this.customersRepository.delete(customerExists);
  }
}

export default DeleteCustomerService;
