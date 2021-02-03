import Product from '../infra/typeorm/entities/Product';
import ICreateProductDTO from '../dtos/ICreateProductDTO';

export default interface IProductsRepository {
  findById(id: string): Promise<Product | undefined>;
  findByIds(ids: string[]): Promise<Product[]>;
  create(productInfo: ICreateProductDTO): Promise<Product>;
  findAll(): Promise<Product[]>;
  update(product: Product, productInfo: ICreateProductDTO): Promise<Product>;
  delete(product: Product): Promise<void>;
}
