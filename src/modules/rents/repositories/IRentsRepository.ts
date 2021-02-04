import Rent from '../infra/typeorm/entities/Rent';
import ICreateRentDTO from '../dtos/ICreateRentDTO';

export default interface IRentsRepository {
  create(rentInfo: ICreateRentDTO): Promise<Rent>;
  findByDate(rentDate: Date): Promise<Rent[]>;
  // findAll(): Promise<Address[]>;
  // findById(address_id: string): Promise<Address | undefined>;
  // findByType(address_type: AddressType): Promise<Address[]>;
  // update(address: Address, addressInfo: ICreateAddressDTO): Promise<Address>;
  // delete(address: Address): Promise<void>;
}
