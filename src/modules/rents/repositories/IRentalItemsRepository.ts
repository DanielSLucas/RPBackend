import RentalItem from '../infra/typeorm/entities/RentalItem';
import { RentItem } from '../dtos/ICreateRentDTO';

export default interface IRentalItemsRepository {
  findByRent(rentsIds: string[]): Promise<RentalItem[]>;
  create(rentalItems: RentItem[], rent_id: string): Promise<RentalItem[]>;
  // findAll(): Promise<Product[]>;
  // update(product: Product, productInfo: ICreateProductDTO): Promise<Product>;
  // delete(product: Product): Promise<void>;
}
