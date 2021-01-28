import { v4 } from 'uuid';

import ICreateAddressDTO from '../../dtos/ICreateAddressDTO';
import IAddressesRepository from '../IAddressesRepository';

import Address from '../../infra/typeorm/entities/Address';

type AddressType = 'Cobrança' | 'Salão' | 'Entrega' | 'Busca';
class AddressesRepository implements IAddressesRepository {
  private addresses: Address[] = [];

  public async findAll(): Promise<Address[]> {
    return this.addresses;
  }

  public async findByType(address_type: AddressType): Promise<Address[]> {
    const filteredAddresses = this.addresses.filter(
      address => address.address_type === address_type,
    );

    return filteredAddresses;
  }

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
}

export default AddressesRepository;
