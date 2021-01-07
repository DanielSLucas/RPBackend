import { EntityRepository, getRepository, Repository } from 'typeorm';
import ICreateProductDTO from '../../../dtos/ICreateProductDTO';
import IProductsRepository from '../../../repositories/IProductsRepository';

import Product from '../entities/Product';

@EntityRepository(Product)
class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findById(id: string): Promise<Product | undefined> {
    const findProduct = await this.ormRepository.findOne({
      where: { id },
    });

    return findProduct || undefined;
  }

  public async listAll(): Promise<Product[]> {
    const products = await this.ormRepository.find();

    return products;
  }

  public async create({
    name,
    quantity,
    value,
    product_type,
  }: ICreateProductDTO): Promise<Product> {
    const product = await this.ormRepository.create({
      name,
      quantity,
      value,
      product_type,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async update(
    product: Product,
    { name, quantity, value, product_type }: ICreateProductDTO,
  ): Promise<Product> {
    Object.assign(product, {
      name,
      quantity,
      value,
      product_type,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async delete(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }
}

export default ProductsRepository;
