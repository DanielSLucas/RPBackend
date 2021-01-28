import AppError from '../../../shared/errors/AppError';
import FakeProductsRepository from '../repositories/fakes/FakeProductRepository';
import CreateProductService from './CreateProductService';
import ShowProductService from './ShowProductService';

let fakeProductRepository: FakeProductsRepository;

let showProduct: ShowProductService;

describe('ShowProduct', () => {
  beforeEach(() => {
    fakeProductRepository = new FakeProductsRepository();
    showProduct = new ShowProductService(fakeProductRepository);
  });

  it('should be able to show a product', async () => {
    const createProduct = new CreateProductService(fakeProductRepository);

    const product1 = await createProduct.execute({
      name: 'Bolo normal',
      quantity: 1,
      value: 60,
      product_type: 'Bolos',
    });

    const product = await showProduct.execute(product1.id);

    expect(product).toEqual(product1);
  });

  it('should not be able to show a nonexistent product', async () => {
    await expect(
      showProduct.execute('a-nonexistent-product-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
