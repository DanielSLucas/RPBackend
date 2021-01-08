import FakeProductsRepository from '../repositories/fakes/FakeProductRepository';
import ListProductsService from './ListProductsService';
import CreateProductService from './CreateProductService';

describe('ListProducts', () => {
  it('should be able to list all products', async () => {
    const fakeProductRepository = new FakeProductsRepository();
    const listProducts = new ListProductsService(fakeProductRepository);
    const createProduct = new CreateProductService(fakeProductRepository);

    const product1 = await createProduct.execute({
      name: 'Bolo normal',
      quantity: 1,
      value: 60,
      product_type: 'Bolos',
    });

    const product2 = await createProduct.execute({
      name: 'Bolo anormal',
      quantity: -1,
      value: 666,
      product_type: 'Bolos',
    });

    const products = await listProducts.execute();

    expect(products).toEqual([product1, product2]);
  });
});
