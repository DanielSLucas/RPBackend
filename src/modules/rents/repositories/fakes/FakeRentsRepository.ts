import { v4 } from 'uuid';

import ICreateRentDTO from '../../dtos/ICreateRentDTO';
import IRentsRepository from '../IRentsRepository';

import Rent from '../../infra/typeorm/entities/Rent';

class RentsRepository implements IRentsRepository {
  private rents: Rent[] = [];

  public async create(rentInfo: ICreateRentDTO): Promise<Rent> {
    const rent = new Rent();

    Object.assign(rent, {
      id: v4(),
      ...rentInfo,
    });

    this.rents.push(rent);

    return rent;
  }

  public async findByDate(rentDate: Date): Promise<Rent[]> {
    const rents = this.rents.filter(rent => rent.rent_date === rentDate);

    return rents;
  }

  public async findBetweenDates(
    startDate: Date,
    finishDate: Date,
  ): Promise<Rent[]> {
    const rents = this.rents.filter(
      rent => rent.rent_date >= startDate && rent.rent_date <= finishDate,
    );

    return rents;
  }

  public async findById(rent_id: string): Promise<Rent | undefined> {
    const rent = this.rents.find(item => item.id === rent_id);

    return rent;
  }

  public async findByIds(rentsIds: string[]): Promise<Rent[]> {
    const rents: Rent[] = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < rentsIds.length; i++) {
      const matchedItem = this.rents.find(rent => rent.id === rentsIds[i]);

      if (matchedItem) {
        rents.push(matchedItem);
      }
    }

    return rents;
  }

  public async findByCustomer(customer_id: string): Promise<Rent[]> {
    const rents = this.rents.filter(item => item.customer_id === customer_id);

    return rents;
  }

  public async findAll(): Promise<Rent[]> {
    return this.rents;
  }

  public async delete(rent: Rent): Promise<void> {
    const rentIndex = this.rents.findIndex(iten => iten.id === rent.id);

    this.rents.splice(rentIndex, 1);
  }

  public async update(rent: Rent, rentInfo: ICreateRentDTO): Promise<Rent> {
    const rentIndex = this.rents.findIndex(iten => iten.id === rent.id);

    Object.assign(this.rents[rentIndex], rentInfo);

    return this.rents[rentIndex];
  }
}

export default RentsRepository;
