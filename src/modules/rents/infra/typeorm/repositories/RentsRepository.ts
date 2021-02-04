import { EntityRepository, getRepository, Repository } from 'typeorm';
import ICreateRentDTO from '../../../dtos/ICreateRentDTO';
import IRentsRepository from '../../../repositories/IRentsRepository';

import Rent from '../entities/Rent';

@EntityRepository(Rent)
class RentsRepository implements IRentsRepository {
  private ormRepository: Repository<Rent>;

  constructor() {
    this.ormRepository = getRepository(Rent);
  }

  public async create({
    customer_id,
    address_id,
    rent_date,
    payment_way,
    payment_status,
    total_value,
  }: ICreateRentDTO): Promise<Rent> {
    const rent = await this.ormRepository.create({
      customer_id,
      address_id,
      rent_date,
      payment_way,
      payment_status,
      total_value,
    });

    await this.ormRepository.save(rent);

    return rent;
  }

  public async findByDate(rentDate: Date): Promise<Rent[]> {
    const rents = await this.ormRepository.find({
      where: { rent_date: rentDate },
    });

    return rents;
  }

  public async findById(rent_id: string): Promise<Rent | undefined> {
    const findRent = await this.ormRepository.findOne({
      where: { id: rent_id },
      relations: ['customer', 'address'],
    });

    return findRent || undefined;
  }

  public async findAll(): Promise<Rent[]> {
    const rents = await this.ormRepository.find({
      order: { rent_date: 'DESC' },
      relations: ['customer'],
    });

    return rents;
  }

  // public async findByType(address_type: AddressType): Promise<Address[]> {
  //   const addresses = await this.ormRepository.find({
  //     where: { address_type },
  //   });

  //   return addresses;
  // }

  // public async update(
  //   address: Address,
  //   {
  //     description,
  //     postal_code,
  //     city,
  //     neighborhood,
  //     street,
  //     number,
  //     address_type,
  //   }: ICreateAddressDTO,
  // ): Promise<Address> {
  //   Object.assign(address, {
  //     description,
  //     postal_code,
  //     city,
  //     neighborhood,
  //     street,
  //     number,
  //     address_type,
  //   });

  //   await this.ormRepository.save(address);

  //   return address;
  // }

  // public async delete(address: Address): Promise<void> {
  //   await this.ormRepository.remove(address);
  // }
}

export default RentsRepository;
