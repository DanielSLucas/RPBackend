import { EntityRepository, getRepository, Repository } from 'typeorm';
import ICreateAddressDTO from '../../../dtos/ICreateAddressDTO';
import IAddressesRepository from '../../../repositories/IAddressesRepository';

import Address from '../entities/Address';

type AddressType = 'Cobrança' | 'Salão' | 'Entrega' | 'Busca';

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

  public async findByType(address_type: AddressType): Promise<Address[]> {
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
    const address = await this.ormRepository.create({
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

  // public async findById(id: string): Promise<Address | undefined> {
  //   const findProduct = await this.ormRepository.findOne({
  //     where: { id },
  //   });

  //   return findProduct || undefined;
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

export default AddressesRepository;
