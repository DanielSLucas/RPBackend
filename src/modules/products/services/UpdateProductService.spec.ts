import FakeProductsRepository from '../repositories/fakes/FakeProductRepository';
import CreateProductService from './CreateProductService';
import UpdateProductService from './UpdateProductService';

describe('UpdateProduct', () => {
  it('should be able to update a product', async () => {
    const fakeProductRepository = new FakeProductsRepository();
    const updateProduct = new UpdateProductService(fakeProductRepository);
    const createProduct = new CreateProductService(fakeProductRepository);

    const product1 = await createProduct.execute({
      name: 'Bolo normal',
      quantity: 1,
      value: 60,
      product_type: 'Bolos',
    });

    const product = await updateProduct.execute({
      product_id: product1.id,
      name: 'Bolo não tão normal',
      quantity: 2,
      value: 150,
      product_type: 'Bolos',
    });

    expect(product).toEqual({
      id: product1.id,
      name: 'Bolo não tão normal',
      quantity: 2,
      value: 150,
      product_type: 'Bolos',
    });
  });

  it('should not be able to update a nonexistent product', async () => {
    const fakeProductRepository = new FakeProductsRepository();
    const updateProduct = new UpdateProductService(fakeProductRepository);

    await expect(
      updateProduct.execute({
        product_id: 'a-nonexistent-product-id',
        name: 'Bolo não tão normal',
        quantity: 2,
        value: 150,
        product_type: 'Bolos',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
