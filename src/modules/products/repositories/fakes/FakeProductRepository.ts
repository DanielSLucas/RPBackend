import { v4 } from 'uuid';

import IProductRepository from '../IProductsRepository';
import ICreateProductDTO from '../../dtos/ICreateProductDTO';

import Product from '../../infra/typeorm/entities/Product';

class ProductRepository implements IProductRepository {
  private products: Product[] = [];

  public async findById(id: string): Promise<Product | undefined> {
    const findProduct = this.products.find(product => product.id === id);

    return findProduct;
  }

  public async findByIds(ids: string[]): Promise<Product[]> {
    const foundProducts = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < ids.length; i++) {
      const matchedItems = this.products.filter(item => item.id === ids[i]);

      foundProducts.push(...matchedItems);
    }

    return foundProducts;
  }

  public async findAll(): Promise<Product[]> {
    return this.products;
  }

  public async create(productInfo: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, {
      id: v4(),
      ...productInfo,
    });

    this.products.push(product);

    return product;
  }

  public async update(
    product: Product,
    productInfo: ICreateProductDTO,
  ): Promise<Product> {
    const productIndex = this.products.findIndex(
      iten => iten.id === product.id,
    );

    Object.assign(this.products[productIndex], productInfo);

    return this.products[productIndex];
  }

  public async delete(product: Product): Promise<void> {
    const productIndex = this.products.findIndex(
      item => item.id === product.id,
    );

    this.products.splice(productIndex, 1);
  }
}

export default ProductRepository;
