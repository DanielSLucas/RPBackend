import { inject, injectable } from 'tsyringe';
import Address from '../infra/typeorm/entities/Address';
import IAddressRepository from '../repositories/IAddressesRepository';
import ICreateAddressDTO from '../dtos/ICreateAddressDTO';
import IAddressCustomerRepository from '../repositories/IAddressCustomersRepository';
import AppError from '../../../shared/errors/AppError';
import ICustomersRepository from '../../customers/repositories/ICustomersRepository';

interface Request extends ICreateAddressDTO {
  customer_id?: string;
}

@injectable()
class CreateAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressRepository,

    @inject('AddressCustomersRepository')
    private addressCustomerRepository: IAddressCustomerRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({
    customer_id,
    description,
    postal_code,
    city,
    neighborhood,
    street,
    number,
    address_type,
  }: Request): Promise<Address> {
    let address: Address;

    if (customer_id) {
      const customerExists = await this.customersRepository.findById(
        customer_id,
      );

      if (!customerExists) {
        throw new AppError("Customer doesn't exist.", 400);
      }

      address = await this.addressesRepository.create({
        description,
        postal_code,
        city,
        neighborhood,
        street,
        number,
        address_type,
      });

      await this.addressCustomerRepository.create(address.id, customer_id);
    } else {
      address = await this.addressesRepository.create({
        description,
        postal_code,
        city,
        neighborhood,
        street,
        number,
        address_type,
      });
    }

    return address;
  }
}

export default CreateAddressService;
