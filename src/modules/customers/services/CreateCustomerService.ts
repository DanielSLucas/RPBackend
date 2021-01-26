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
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ name, whatsapp, cpf }: Request): Promise<Customer> {
    const customerExists = await this.customersRepository.findByCFP(cpf);

    if (customerExists) {
      throw new AppError('User with this cpf already exists.', 400);
    }

    const customer = await this.customersRepository.create({
      name,
      whatsapp,
      cpf,
    });

    return customer;
  }
}

export default CreateCustomerService;
