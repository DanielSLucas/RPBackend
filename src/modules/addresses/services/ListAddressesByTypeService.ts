import { inject, injectable } from 'tsyringe';

import IAddressRepository from '../repositories/IAddressesRepository';

import Address from '../infra/typeorm/entities/Address';

export type AddressType = 'Cobrança' | 'Salão' | 'Entrega' | 'Busca';

@injectable()
class ListAddressesByTypeService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressRepository,
  ) {}

  public async execute(address_type?: AddressType): Promise<Address[]> {
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
