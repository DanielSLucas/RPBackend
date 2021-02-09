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
}

export default AddressCustomersRepository;
