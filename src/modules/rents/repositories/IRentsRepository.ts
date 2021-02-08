import Rent from '../infra/typeorm/entities/Rent';
import ICreateRentDTO from '../dtos/ICreateRentDTO';

export default interface IRentsRepository {
  create(rentInfo: ICreateRentDTO): Promise<Rent>;
  findByDate(rentDate: Date): Promise<Rent[]>;
  findBetweenDates(startDate: Date, finishDate: Date): Promise<Rent[]>;
  findById(rent_id: string): Promise<Rent | undefined>;
  findByIds(rentsIds: string[]): Promise<Rent[]>;
  findAll(): Promise<Rent[]>;
  update(rent: Rent, rentInfo: ICreateRentDTO): Promise<Rent>;
  delete(rent: Rent): Promise<void>;
}
