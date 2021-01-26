import { EntityRepository, getRepository, Repository } from 'typeorm';
import ICreateCustomerDTO from '../../../dtos/ICreateCustomerDTO';
import ICustomersRepository from '../../../repositories/ICustomersRepository';

import Customer from '../entities/Customer';

@EntityRepository(Customer)
class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({ where: { id } });

    return customer;
  }

  public async findByCFP(cpf: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({ where: { cpf } });

    return customer;
  }

  public async create({
    name,
    whatsapp,
    cpf,
  }: ICreateCustomerDTO): Promise<Customer> {
    const customer = await this.ormRepository.create({
      name,
      whatsapp,
      cpf,
    });

    await this.ormRepository.save(customer);

    return customer;
  }
}

export default CustomersRepository;
