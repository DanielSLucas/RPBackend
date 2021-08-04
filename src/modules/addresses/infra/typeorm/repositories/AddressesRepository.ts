import { EntityRepository, getRepository, Repository } from 'typeorm';
import ICreateAddressDTO from '../../../dtos/ICreateAddressDTO';
import IAddressesRepository from '../../../repositories/IAddressesRepository';

import Address, { AddressTypes } from '../entities/Address';

@EntityRepository(Address)
class AddressesRepository implements IAddressesRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async findAll(): Promise<Address[]> {
    const addresses = await this.ormRepository.find();

    return addresses;
  }

  public async findById(address_id: string): Promise<Address | undefined> {
    const findProduct = await this.ormRepository.findOne({
      where: { id: address_id },
    });

    return findProduct || undefined;
  }

  public async findByType(address_type: AddressTypes): Promise<Address[]> {
    const addresses = await this.ormRepository.find({
      where: { address_type },
    });

    return addresses;
  }

  public async create({
    description,
    postal_code,
    city,
    neighborhood,
    street,
    number,
    address_type,
  }: ICreateAddressDTO): Promise<Address> {
    const address = this.ormRepository.create({
      description,
      postal_code,
      city,
      neighborhood,
      street,
      number,
      address_type,
    });

    await this.ormRepository.save(address);

    return address;
  }

  public async update(
    address: Address,
    {
      description,
      postal_code,
      city,
      neighborhood,
      street,
      number,
      address_type,
    }: ICreateAddressDTO,
  ): Promise<Address> {
    Object.assign(address, {
      description,
      postal_code,
      city,
      neighborhood,
      street,
      number,
      address_type,
    });

    await this.ormRepository.save(address);

    return address;
  }

  public async delete(address: Address): Promise<void> {
    await this.ormRepository.remove(address);
  }
}

export default AddressesRepository;
