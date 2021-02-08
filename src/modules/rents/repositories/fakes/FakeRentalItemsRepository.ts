import { v4 } from 'uuid';
import { RentItem } from '../../dtos/ICreateRentDTO';

import IRentalItemsRepository from '../IRentalItemsRepository';

import RentalItem from '../../infra/typeorm/entities/RentalItem';

class RentalItemsRepository implements IRentalItemsRepository {
  private rentedItems: RentalItem[] = [];

  public async create(
    rentalItems: RentItem[],
    rent_id: string,
  ): Promise<RentalItem[]> {
    const newRentalItems = rentalItems.map(item => {
      const rentalItem = new RentalItem();

      Object.assign(rentalItem, {
        id: v4(),
        rent_id,
        ...item,
      });

      return rentalItem;
    });

    this.rentedItems.push(...newRentalItems);

    return newRentalItems;
  }

  public async findByRents(rentsIds: string[]): Promise<RentalItem[]> {
    const rentalItems = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < rentsIds.length; i++) {
      const matchedItems = this.rentedItems.filter(
        item => item.rent_id === rentsIds[i],
      );

      rentalItems.push(...matchedItems);
    }

    return rentalItems;
  }

  public async findByRent(rent_id: string): Promise<RentalItem[]> {
    const rentalItems = this.rentedItems.filter(
      item => item.rent_id === rent_id,
    );

    return rentalItems;
  }

  public async findByProduct(product_id: string): Promise<RentalItem[]> {
    const rentalItems = this.rentedItems.filter(
      item => item.product_id === product_id,
    );

    return rentalItems;
  }

  public async update(
    oldRentalItems: RentalItem[],
    updatedRentalItems: RentItem[],
  ): Promise<RentalItem[]> {
    const { rent_id } = oldRentalItems[0];

    oldRentalItems.forEach(item => {
      const rentedItemIndex = this.rentedItems.findIndex(
        iten => iten.id === item.id,
      );

      this.rentedItems.splice(rentedItemIndex, 1);
    });

    const newRentalItems = updatedRentalItems.map(item => {
      const rentalItem = new RentalItem();

      Object.assign(rentalItem, {
        id: v4(),
        rent_id,
        ...item,
      });

      return rentalItem;
    });

    this.rentedItems.push(...newRentalItems);

    return newRentalItems;
  }
}

export default RentalItemsRepository;
