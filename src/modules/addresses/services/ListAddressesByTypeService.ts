import { inject, injectable } from 'tsyringe';

import IAddressRepository from '../repositories/IAddressesRepository';

import Address, { AddressTypes } from '../infra/typeorm/entities/Address';

@injectable()
class ListAddressesByTypeService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressRepository,
  ) {}

  public async execute(address_type?: AddressTypes): Promise<Address[]> {
    let addresses: Address[];

    if (address_type) {
      addresses = await this.addressesRepository.findByType(address_type);
    } else {
      addresses = await this.addressesRepository.findAll();
    }

    return addresses;
  }
}

export default ListAddressesByTypeService;
