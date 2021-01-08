import FakeProductsRepository from '../repositories/fakes/FakeProductRepository';
import CreateProductService from './CreateProductService';

describe('CreateProduct', () => {
  it('should be able to create a new product', async () => {
    const fakeProductRepository = new FakeProductsRepository();
    const createProduct = new CreateProductService(fakeProductRepository);

    const product = await createProduct.execute({
      name: 'Bolo normal',
      quantity: 1,
      value: 60,
      product_type: 'Bolos',
    });

    expect(product).toHaveProperty('id');
    expect(product).toEqual({
      id: product.id,
      name: 'Bolo normal',
      quantity: 1,
      value: 60,
      product_type: 'Bolos',
    });
  });
});
