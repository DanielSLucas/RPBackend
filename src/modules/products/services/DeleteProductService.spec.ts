import FakeProductsRepository from '../repositories/fakes/FakeProductRepository';
import DeleteProductService from './DeleteProductService';
import CreateProductService from './CreateProductService';
import ListProductsService from './ListProductsService';
import AppError from '../../../shared/errors/AppError';

describe('DeleteProduct', () => {
  it('should be able to delete a specified product', async () => {
    const fakeProductRepository = new FakeProductsRepository();
    const deleteProduct = new DeleteProductService(fakeProductRepository);
    const createProduct = new CreateProductService(fakeProductRepository);
    const listProducts = new ListProductsService(fakeProductRepository);

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

    await deleteProduct.execute(product1.id);

    const products = await listProducts.execute();

    expect(products).toEqual([product2]);
  });

  it('should not be able to delete a nonexistent product', async () => {
    const fakeProductRepository = new FakeProductsRepository();
    const deleteProduct = new DeleteProductService(fakeProductRepository);

    await expect(
      deleteProduct.execute('a-nonexistent-product-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
