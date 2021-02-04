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

  // public async update(
  //   customer: Customer,
  //   customerInfo: ICreateCustomerDTO,
  // ): Promise<Customer> {
  //   const customerIndex = this.customers.findIndex(
  //     iten => iten.id === customer.id,
  //   );

  //   Object.assign(this.customers[customerIndex], customerInfo);

  //   return this.customers[customerIndex];
  // }

  // public async delete(customer: Customer): Promise<void> {
  //   const customerIndex = this.customers.findIndex(
  //     iten => iten.id === customer.id,
  //   );

  //   this.customers.splice(customerIndex, 1);
  // }

  // public async findByCFP(cpf: string): Promise<Customer | undefined> {
  //   const customer = this.customers.find(item => item.cpf === cpf);

  //   return customer;
  // }

  // public async findAll(): Promise<Customer[]> {
  //   return this.customers;
  // }
}

export default RentalItemsRepository;
