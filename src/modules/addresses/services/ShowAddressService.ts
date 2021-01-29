import { inject, injectable } from 'tsyringe';

import IAddressRepository from '../repositories/IAddressesRepository';

import Address from '../infra/typeorm/entities/Address';
import AppError from '../../../shared/errors/AppError';

@injectable()
class ShowAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressRepository,
  ) {}

  public async execute(address_id: string): Promise<Address> {
    const address = await this.addressesRepository.findById(address_id);

    if (!address) {
      throw new AppError("Address doesn't exist.");
    }

    return address;
  }
}

export default ShowAddressService;
