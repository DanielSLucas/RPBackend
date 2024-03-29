import AppError from '../../../shared/errors/AppError';
import { ProductTypes } from '../infra/typeorm/entities/Product';
import FakeProductsRepository from '../repositories/fakes/FakeProductRepository';
import CreateProductService from './CreateProductService';
import UpdateProductService from './UpdateProductService';

let fakeProductRepository: FakeProductsRepository;

let updateProduct: UpdateProductService;

describe('UpdateProduct', () => {
  beforeEach(() => {
    fakeProductRepository = new FakeProductsRepository();
    updateProduct = new UpdateProductService(fakeProductRepository);
  });

  it('should be able to update a product', async () => {
    const createProduct = new CreateProductService(fakeProductRepository);

    const product1 = await createProduct.execute({
      name: 'Bolo normal',
      quantity: 1,
      value: 60,
      product_type: ProductTypes.CAKES,
    });

    const product = await updateProduct.execute({
      product_id: product1.id,
      name: 'Bolo não tão normal',
      quantity: 2,
      value: 150,
      product_type: ProductTypes.CAKES,
    });

    expect(product).toEqual({
      id: product1.id,
      name: 'Bolo não tão normal',
      quantity: 2,
      value: 150,
      product_type: ProductTypes.CAKES,
    });
  });

  it('should not be able to update a nonexistent product', async () => {
    await expect(
      updateProduct.execute({
        product_id: 'a-nonexistent-product-id',
        name: 'Bolo não tão normal',
        quantity: 2,
        value: 150,
        product_type: ProductTypes.CAKES,
      }),
    ).rejects.toEqual(new AppError('Product not found', 404));
  });
});
