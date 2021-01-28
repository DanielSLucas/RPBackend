import AddressCustomers from '../infra/typeorm/entities/AddressCustomers';
// import ICreateAddressDTO from '../dtos/ICreateAddressDTO';

export default interface IAddressCustomerRepository {
  // findById(id: string): Promise<Product | undefined>;
  create(address_id: string, customer_id: string): Promise<AddressCustomers>;
  // findAll(): Promise<Product[]>;
  // update(product: Product, productInfo: ICreateProductDTO): Promise<Product>;
  // delete(product: Product): Promise<void>;
}
