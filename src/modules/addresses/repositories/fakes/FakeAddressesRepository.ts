import { v4 } from 'uuid';

import ICreateAddressDTO from '../../dtos/ICreateAddressDTO';
import IAddressesRepository from '../IAddressesRepository';

import Address from '../../infra/typeorm/entities/Address';

class AddressesRepository implements IAddressesRepository {
  private addresses: Address[] = [];

  public async create(addressInfo: ICreateAddressDTO): Promise<Address> {
    const address = new Address();

    Object.assign(address, {
      id: v4(),
      ...addressInfo,
    });

    this.addresses.push(address);

    return address;
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

  // public async findById(id: string): Promise<Customer | undefined> {
  //   const customer = this.customers.find(item => item.id === id);

  //   return customer;
  // }

  // public async findByCFP(cpf: string): Promise<Customer | undefined> {
  //   const customer = this.customers.find(item => item.cpf === cpf);

  //   return customer;
  // }

  // public async findAll(): Promise<Customer[]> {
  //   return this.customers;
  // }
}

export default AddressesRepository;
