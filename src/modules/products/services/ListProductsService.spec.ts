import FakeProductsRepository from '../repositories/fakes/FakeProductRepository';
import ListProductsService from './ListProductsService';
import CreateProductService from './CreateProductService';
import { ProductTypes } from '../infra/typeorm/entities/Product';

describe('ListProducts', () => {
  it('should be able to list all products', async () => {
    const fakeProductRepository = new FakeProductsRepository();
    const listProducts = new ListProductsService(fakeProductRepository);
    const createProduct = new CreateProductService(fakeProductRepository);

    const product1 = await createProduct.execute({
      name: 'Bolo normal',
      quantity: 1,
      value: 60,
      product_type: ProductTypes.CAKES,
    });

    const product2 = await createProduct.execute({
      name: 'Bolo anormal',
      quantity: 6,
      value: 66,
      product_type: ProductTypes.CAKES,
    });

    const products = await listProducts.execute();

    expect(products).toEqual([product1, product2]);
  });
});
