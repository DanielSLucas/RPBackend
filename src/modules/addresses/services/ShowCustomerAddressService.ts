import { inject, injectable } from 'tsyringe';
import AddressCustomer from '../infra/typeorm/entities/AddressCustomers';
import IAddressCustomerRepository from '../repositories/IAddressCustomersRepository';
import AppError from '../../../shared/errors/AppError';
import ICustomersRepository from '../../customers/repositories/ICustomersRepository';

@injectable()
class ShowCustomerAddressService {
  constructor(
    @inject('AddressCustomersRepository')
    private addressCustomerRepository: IAddressCustomerRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute(customer_id: string): Promise<AddressCustomer> {
    const customerExists = await this.customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError("Customer doesn't exist.", 400);
    }

    const addressCustomer = await this.addressCustomerRepository.findByCustomer(
      customer_id,
    );

    if (!addressCustomer) {
      throw new AppError('Customer address not found.', 404);
    }

    return addressCustomer;
  }
}

export default ShowCustomerAddressService;
