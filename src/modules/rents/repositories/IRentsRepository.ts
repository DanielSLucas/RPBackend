import Rent from '../infra/typeorm/entities/Rent';
import ICreateRentDTO from '../dtos/ICreateRentDTO';

export default interface IRentsRepository {
  create(rentInfo: ICreateRentDTO): Promise<Rent>;
  findByDate(rentDate: Date): Promise<Rent[]>;
  findBetweenDates(startDate: Date, finishDate: Date): Promise<Rent[]>;
  findById(rent_id: string): Promise<Rent | undefined>;
  findAll(): Promise<Rent[]>;
  // findByType(address_type: AddressType): Promise<Address[]>;
  // update(address: Address, addressInfo: ICreateAddressDTO): Promise<Address>;
  delete(rent: Rent): Promise<void>;
}
