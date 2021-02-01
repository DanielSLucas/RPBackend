import { EntityRepository, getRepository, Repository } from 'typeorm';
import IAddressCustomersRepository from '../../../repositories/IAddressCustomersRepository';

import AddressCustomers from '../entities/AddressCustomers';

@EntityRepository(AddressCustomers)
class AddressCustomersRepository implements IAddressCustomersRepository {
  private ormRepository: Repository<AddressCustomers>;

  constructor() {
    this.ormRepository = getRepository(AddressCustomers);
  }

  public async create(
    address_id: string,
    customer_id: string,
  ): Promise<AddressCustomers> {
    const addressCustomer = await this.ormRepository.create({
      address_id,
      customer_id,
    });

    await this.ormRepository.save(addressCustomer);

    return addressCustomer;
  }

  public async findByCustomer(
    customer_id: string,
  ): Promise<AddressCustomers | undefined> {
    const findCustomerAddress = await this.ormRepository.findOne({
      where: { customer_id },
      relations: ['address'],
    });

    return findCustomerAddress;
  }

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

export default AddressCustomersRepository;
