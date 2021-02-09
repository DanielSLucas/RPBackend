import RentalItem from '../infra/typeorm/entities/RentalItem';
import { RentItem } from '../dtos/ICreateRentDTO';

export default interface IRentalItemsRepository {
  findByRents(rentsIds: string[]): Promise<RentalItem[]>;
  findByRent(rent_id: string): Promise<RentalItem[]>;
  create(rentalItems: RentItem[], rent_id: string): Promise<RentalItem[]>;
  findByProduct(product_id: string): Promise<RentalItem[]>;
  update(
    oldRentalItems: RentalItem[],
    updatedRentalItems: RentItem[],
  ): Promise<RentalItem[]>;
}
