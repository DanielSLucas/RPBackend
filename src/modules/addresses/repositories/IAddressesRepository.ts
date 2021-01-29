import Address from '../infra/typeorm/entities/Address';
import ICreateAddressDTO from '../dtos/ICreateAddressDTO';

type AddressType = 'Cobrança' | 'Salão' | 'Entrega' | 'Busca';

export default interface IAddressesRepository {
  create(addressInfo: ICreateAddressDTO): Promise<Address>;
  findAll(): Promise<Address[]>;
  findById(address_id: string): Promise<Address | undefined>;
  findByType(address_type: AddressType): Promise<Address[]>;
  update(address: Address, addressInfo: ICreateAddressDTO): Promise<Address>;
  delete(address: Address): Promise<void>;
}
