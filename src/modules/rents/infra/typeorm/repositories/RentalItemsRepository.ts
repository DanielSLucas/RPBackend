import { EntityRepository, getRepository, In, Repository } from 'typeorm';
import { RentItem } from '../../../dtos/ICreateRentDTO';
import IRentalItemsRepository from '../../../repositories/IRentalItemsRepository';

import RentalItem from '../entities/RentalItem';

@EntityRepository(RentalItem)
class RentalItemsRepository implements IRentalItemsRepository {
  private ormRepository: Repository<RentalItem>;

  constructor() {
    this.ormRepository = getRepository(RentalItem);
  }

  public async create(
    rentalItems: RentItem[],
    rent_id: string,
  ): Promise<RentalItem[]> {
    const serializedRentalItems = rentalItems.map(item => {
      return {
        ...item,
        rent_id,
      };
    });

    const newRentalItems = await this.ormRepository.create(
      serializedRentalItems,
    );

    await this.ormRepository.save(newRentalItems);

    return newRentalItems;
  }

  public async findByRents(rentsIds: string[]): Promise<RentalItem[]> {
    const rentalItems = await this.ormRepository.find({
      where: { rent_id: In(rentsIds) },
    });

    return rentalItems;
  }

  public async findByRent(rent_id: string): Promise<RentalItem[]> {
    const rentalItems = await this.ormRepository.find({
      where: { rent_id },
      relations: ['product'],
    });

    return rentalItems;
  }

  public async update(
    oldRentalItems: RentalItem[],
    updatedRentalItems: RentItem[],
  ): Promise<RentalItem[]> {
    const { rent_id } = oldRentalItems[0];

    await this.ormRepository.remove(oldRentalItems);

    const serializedRentalItems = updatedRentalItems.map(item => {
      return {
        ...item,
        rent_id,
      };
    });

    const newRentalItems = await this.ormRepository.create(
      serializedRentalItems,
    );

    await this.ormRepository.save(newRentalItems);

    return newRentalItems;
  }
}

export default RentalItemsRepository;
