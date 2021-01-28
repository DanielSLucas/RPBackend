import Address from '../infra/typeorm/entities/Address';
import ICreateAddressDTO from '../dtos/ICreateAddressDTO';

export default interface IAddressesRepository {
  // findById(id: string): Promise<Product | undefined>;
  create(addressInfo: ICreateAddressDTO): Promise<Address>;
  // findAll(): Promise<Product[]>;
  // update(product: Product, productInfo: ICreateProductDTO): Promise<Product>;
  // delete(product: Product): Promise<void>;
}
