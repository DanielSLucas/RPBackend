import { inject, injectable } from 'tsyringe';
import Address from '../infra/typeorm/entities/Address';
import IAddressRepository from '../repositories/IAddressesRepository';
import ICreateAddressDTO from '../dtos/ICreateAddressDTO';

import AppError from '../../../shared/errors/AppError';

@injectable()
class UpdateAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressRepository,
  ) {}

  public async execute(
    address_id: string,
    {
      description,
      postal_code,
      city,
      neighborhood,
      street,
      number,
      address_type,
    }: ICreateAddressDTO,
  ): Promise<Address> {
    const addressExists = await this.addressesRepository.findById(address_id);

    if (!addressExists) {
      throw new AppError("Address doesn't exist.", 400);
    }

    const address = await this.addressesRepository.update(addressExists, {
      description,
      postal_code,
      city,
      neighborhood,
      street,
      number,
      address_type,
    });

    return address;
  }
}

export default UpdateAddressService;
