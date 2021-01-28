import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface Request {
  name: string;
  whatsapp: string;
  cpf: string;
}

@injectable()
class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute(
    user_id: string,
    { name, whatsapp, cpf }: Request,
  ): Promise<Customer> {
    const customerExists = await this.customersRepository.findById(user_id);

    if (!customerExists) {
      throw new AppError("Customer doesn't exist.", 400);
    }

    const customer = await this.customersRepository.update(customerExists, {
      name,
      whatsapp,
      cpf,
    });

    return customer;
  }
}

export default UpdateCustomerService;
