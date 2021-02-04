import { v4 } from 'uuid';

import ICreateRentDTO from '../../dtos/ICreateRentDTO';
import IRentsRepository from '../IRentsRepository';

import Rent from '../../infra/typeorm/entities/Rent';

class RentsRepository implements IRentsRepository {
  private rents: Rent[] = [];

  public async create(rentInfo: ICreateRentDTO): Promise<Rent> {
    const rent = new Rent();

    Object.assign(rent, {
      id: v4(),
      ...rentInfo,
    });

    this.rents.push(rent);

    return rent;
  }

  public async findByDate(rentDate: Date): Promise<Rent[]> {
    const rents = this.rents.filter(rent => rent.rent_date === rentDate);

    return rents;
  }

  public async findById(rent_id: string): Promise<Rent | undefined> {
    const rent = this.rents.find(item => item.id === rent_id);

    return rent;
  }

  // public async findAll(): Promise<Address[]> {
  //   return this.addresses;
  // }

  // public async findById(address_id: string): Promise<Address | undefined> {
  //   const address = this.addresses.find(item => item.id === address_id);

  //   return address;
  // }

  // public async findByType(address_type: AddressType): Promise<Address[]> {
  //   const filteredAddresses = this.addresses.filter(
  //     address => address.address_type === address_type,
  //   );

  //   return filteredAddresses;
  // }

  // public async update(
  //   address: Address,
  //   addressInfo: ICreateAddressDTO,
  // ): Promise<Address> {
  //   const addressIndex = this.addresses.findIndex(
  //     iten => iten.id === address.id,
  //   );

  //   Object.assign(this.addresses[addressIndex], addressInfo);

  //   return this.addresses[addressIndex];
  // }

  // public async delete(address: Address): Promise<void> {
  //   const addressIndex = this.addresses.findIndex(
  //     iten => iten.id === address.id,
  //   );

  //   this.addresses.splice(addressIndex, 1);
  // }
}

export default RentsRepository;
