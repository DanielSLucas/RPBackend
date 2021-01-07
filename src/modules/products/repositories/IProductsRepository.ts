import Product from '../infra/typeorm/entities/Product';
import ICreateProductDTO from '../dtos/ICreateProductDTO';

export default interface IProductsRepository {
  findById(id: string): Promise<Product | undefined>;
  create(productInfo: ICreateProductDTO): Promise<Product>;
  listAll(): Promise<Product[]>;
  update(product: Product, productInfo: ICreateProductDTO): Promise<Product>;
  delete(product: Product): Promise<void>;
}
