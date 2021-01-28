import Address from '../infra/typeorm/entities/Address';
import ICreateAddressDTO from '../dtos/ICreateAddressDTO';

type AddressType = 'Cobrança' | 'Salão' | 'Entrega' | 'Busca';

export default interface IAddressesRepository {
  // findById(id: string): Promise<Product | undefined>;
  create(addressInfo: ICreateAddressDTO): Promise<Address>;
  findAll(): Promise<Address[]>;
  findByType(address_type: AddressType): Promise<Address[]>;
  // update(product: Product, productInfo: ICreateProductDTO): Promise<Product>;
  // delete(product: Product): Promise<void>;
}
