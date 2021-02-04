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

  public async findByRent(rentsIds: string[]): Promise<RentalItem[]> {
    const rentalItems = await this.ormRepository.find({
      where: { rent_id: In(rentsIds) },
    });

    return rentalItems;
  }

  // public async findByCustomer(
  //   customer_id: string,
  // ): Promise<AddressCustomers | undefined> {
  //   const findCustomerAddress = await this.ormRepository.findOne({
  //     where: { customer_id },
  //     relations: ['address'],
  //   });

  //   return findCustomerAddress;
  // }

  // public async findAll(): Promise<Address[]> {
  //   const products = await this.ormRepository.find();

  //   return products;
  // }

  // public async update(
  //   product: Address,
  //   { name, quantity, value, product_type }: ICreateAddressDTO,
  // ): Promise<Address> {
  //   Object.assign(product, {
  //     name,
  //     quantity,
  //     value,
  //     product_type,
  //   });

  //   await this.ormRepository.save(product);

  //   return product;
  // }

  // public async delete(product: Address): Promise<void> {
  //   await this.ormRepository.remove(product);
  // }
}

export default RentalItemsRepository;
