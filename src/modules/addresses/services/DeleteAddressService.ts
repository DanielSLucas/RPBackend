import { inject, injectable } from 'tsyringe';
import IAddressRepository from '../repositories/IAddressesRepository';

import AppError from '../../../shared/errors/AppError';

@injectable()
class DeleteAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressRepository,
  ) {}

  public async execute(address_id: string): Promise<void> {
    const addressExists = await this.addressesRepository.findById(address_id);

    if (!addressExists) {
      throw new AppError("Address doesn't exists.", 400);
    }

    await this.addressesRepository.delete(addressExists);
  }
}

export default DeleteAddressService;
