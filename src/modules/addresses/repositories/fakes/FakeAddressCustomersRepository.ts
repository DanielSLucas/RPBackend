import { v4 } from 'uuid';

import IAddressCustomersRepository from '../IAddressCustomersRepository';

import AddressCustomers from '../../infra/typeorm/entities/AddressCustomers';

class AddressCustomersRepository implements IAddressCustomersRepository {
  private addressCustomers: AddressCustomers[] = [];

  public async create(
    address_id: string,
    customer_id: string,
  ): Promise<AddressCustomers> {
    const addressCustomer = new AddressCustomers();

    Object.assign(addressCustomer, {
      id: v4(),
      address_id,
      customer_id,
    });

    this.addressCustomers.push(addressCustomer);

    return addressCustomer;
  }

  public async findByCustomer(
    id: string,
  ): Promise<AddressCustomers | undefined> {
    const addressCustomer = this.addressCustomers.find(
      item => item.customer_id === id,
    );

    return addressCustomer;
  }

  // public async update(
  //   customer: Customer,
  //   customerInfo: ICreateCustomerDTO,
  // ): Promise<Customer> {
  //   const customerIndex = this.customers.findIndex(
  //     iten => iten.id === customer.id,
  //   );

  //   Object.assign(this.customers[customerIndex], customerInfo);

  //   return this.customers[customerIndex];
  // }

  // public async delete(customer: Customer): Promise<void> {
  //   const customerIndex = this.customers.findIndex(
  //     iten => iten.id === customer.id,
  //   );

  //   this.customers.splice(customerIndex, 1);
  // }

  // public async findByCFP(cpf: string): Promise<Customer | undefined> {
  //   const customer = this.customers.find(item => item.cpf === cpf);

  //   return customer;
  // }

  // public async findAll(): Promise<Customer[]> {
  //   return this.customers;
  // }
}

export default AddressCustomersRepository;
