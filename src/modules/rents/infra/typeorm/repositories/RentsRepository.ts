import {
  Between,
  EntityRepository,
  getRepository,
  In,
  Repository,
} from 'typeorm';
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
    const rent = this.ormRepository.create({
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

  public async findBetweenDates(
    startDate: Date,
    finishDate: Date,
  ): Promise<Rent[]> {
    const rents = await this.ormRepository.find({
      where: { rent_date: Between(startDate, finishDate) },
      relations: ['customer'],
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

  public async findByIds(rentsIDs: string[]): Promise<Rent[]> {
    const rents = await this.ormRepository.find({
      where: { id: In(rentsIDs) },
    });

    return rents;
  }

  public async findByCustomer(customer_id: string): Promise<Rent[]> {
    const rents = await this.ormRepository.find({ where: { customer_id } });

    return rents;
  }

  public async findAll(): Promise<Rent[]> {
    const rents = await this.ormRepository.find({
      order: { rent_date: 'DESC' },
      relations: ['customer'],
    });

    return rents;
  }

  public async delete(rent: Rent): Promise<void> {
    await this.ormRepository.remove(rent);
  }

  public async update(
    rent: Rent,
    {
      customer_id,
      address_id,
      rent_date,
      payment_way,
      payment_status,
      total_value,
    }: ICreateRentDTO,
  ): Promise<Rent> {
    Object.assign(rent, {
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
}

export default RentsRepository;
