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

  public async findById(address_id: string): Promise<Address | undefined> {
    const address = this.addresses.find(item => item.id === address_id);

    return address;
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

  public async update(
    address: Address,
    addressInfo: ICreateAddressDTO,
  ): Promise<Address> {
    const addressIndex = this.addresses.findIndex(
      iten => iten.id === address.id,
    );

    Object.assign(this.addresses[addressIndex], addressInfo);

    return this.addresses[addressIndex];
  }

  public async delete(address: Address): Promise<void> {
    const addressIndex = this.addresses.findIndex(
      iten => iten.id === address.id,
    );

    this.addresses.splice(addressIndex, 1);
  }
}

export default AddressesRepository;
