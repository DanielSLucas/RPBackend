import AddressCustomers from '../infra/typeorm/entities/AddressCustomers';

export default interface IAddressCustomersRepository {
  findByCustomer(customer_id: string): Promise<AddressCustomers | undefined>;
  create(address_id: string, customer_id: string): Promise<AddressCustomers>;
}
