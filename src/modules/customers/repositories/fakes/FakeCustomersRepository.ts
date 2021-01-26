import { v4 } from 'uuid';

import ICustomersRepository from '../ICustomersRepository';
import ICreateCustomerDTO from '../../dtos/ICreateCustomerDTO';

import Customer from '../../infra/typeorm/entities/Customer';

class CustomersRepository implements ICustomersRepository {
  private customers: Customer[] = [];

  public async create(customerInfo: ICreateCustomerDTO): Promise<Customer> {
    const customer = new Customer();

    Object.assign(customer, {
      id: v4(),
      ...customerInfo,
    });

    this.customers.push(customer);

    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = this.customers.find(item => item.id === id);

    return customer;
  }

  public async findByCFP(cpf: string): Promise<Customer | undefined> {
    const customer = this.customers.find(item => item.cpf === cpf);

    return customer;
  }
}

export default CustomersRepository;
