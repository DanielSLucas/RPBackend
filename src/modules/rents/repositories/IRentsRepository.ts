import Rent from '../infra/typeorm/entities/Rent';
import ICreateRentDTO from '../dtos/ICreateRentDTO';

export default interface IRentsRepository {
  create(rentInfo: ICreateRentDTO): Promise<Rent>;
  findByDate(rentDate: Date): Promise<Rent[]>;
  findBetweenDates(startDate: Date, finishDate: Date): Promise<Rent[]>;
  findById(rent_id: string): Promise<Rent | undefined>;
  findAll(): Promise<Rent[]>;
  // findByType(address_type: AddressType): Promise<Address[]>;
  update(rent: Rent, rentInfo: ICreateRentDTO): Promise<Rent>;
  delete(rent: Rent): Promise<void>;
}
