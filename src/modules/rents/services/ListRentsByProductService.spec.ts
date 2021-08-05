import { add } from 'date-fns';

import { ProductTypes } from '../../products/infra/typeorm/entities/Product';
import { AddressTypes } from '../../addresses/infra/typeorm/entities/Address';
import AppError from '../../../shared/errors/AppError';
import FakeRentsRepository from '../repositories/fakes/FakeRentsRepository';
import FakeRentalItemsRepository from '../repositories/fakes/FakeRentalItemsRepository';
import FakeCustomersRepository from '../../customers/repositories/fakes/FakeCustomersRepository';
import FakeAddressCustomersRepository from '../../addresses/repositories/fakes/FakeAddressCustomersRepository';
import FakeAddressesRepository from '../../addresses/repositories/fakes/FakeAddressesRepository';
import FakeProductRepository from '../../products/repositories/fakes/FakeProductRepository';

import CreateCustomerService from '../../customers/services/CreateCustomerService';
import CreateAddressService from '../../addresses/services/CreateAddressService';
import CreateProductService from '../../products/services/CreateProductService';
import CreateRentService from './CreateRentService';
import ListRentsByProductService from './ListRentsByProductService';
import { DatefnsDateProvider } from '../providers/dateProvider/implementations/DatefnsDateProvider';

let fakeAddressCustomersRepository: FakeAddressCustomersRepository;
let fakeAddressesRepository: FakeAddressesRepository;
let fakeCustomersRepository: FakeCustomersRepository;
let fakeProductRepository: FakeProductRepository;
let fakeRentsRepository: FakeRentsRepository;
let fakeRentalItemsRepository: FakeRentalItemsRepository;
let dateProvider: DatefnsDateProvider;

let createAddress: CreateAddressService;
let createCustomer: CreateCustomerService;
let createProduct: CreateProductService;
let createRent: CreateRentService;
let listRentsByProduct: ListRentsByProductService;

describe('ListRentsByProduct', () => {
  beforeEach(() => {
    fakeAddressCustomersRepository = new FakeAddressCustomersRepository();
    fakeAddressesRepository = new FakeAddressesRepository();
    fakeCustomersRepository = new FakeCustomersRepository();
    fakeProductRepository = new FakeProductRepository();
    fakeRentsRepository = new FakeRentsRepository();
    fakeRentalItemsRepository = new FakeRentalItemsRepository();
    dateProvider = new DatefnsDateProvider();

    createAddress = new CreateAddressService(
      fakeAddressesRepository,
      fakeAddressCustomersRepository,
      fakeCustomersRepository,
    );

    createCustomer = new CreateCustomerService(fakeCustomersRepository);
    createProduct = new CreateProductService(fakeProductRepository);

    createRent = new CreateRentService(
      fakeCustomersRepository,
      fakeAddressesRepository,
      fakeRentsRepository,
      fakeRentalItemsRepository,
      dateProvider,
    );

    listRentsByProduct = new ListRentsByProductService(
      fakeProductRepository,
      fakeRentsRepository,
      fakeRentalItemsRepository,
    );
  });

  it('should be able to list rents that contains a specified product', async () => {
    const customer = await createCustomer.execute({
      name: 'Daniel Lucas',
      whatsapp: '12981025796',
      cpf: '46479951867',
    });

    const address = await createAddress.execute({
      description: 'Casa do Douglas de Souza',
      postal_code: '12605-390',
      city: 'Lorena',
      neighborhood: 'Vila Passos',
      street: 'Mario P de Aquino Filho',
      number: '529',
      address_type: AddressTypes.PERSONAL,
    });

    const product1 = await createProduct.execute({
      name: 'Bolo normal',
      quantity: 2,
      value: 60,
      product_type: ProductTypes.CAKES,
    });

    const product2 = await createProduct.execute({
      name: 'Bolo anormal',
      quantity: 1,
      value: 6000,
      product_type: ProductTypes.CAKES,
    });

    const rent_date = add(new Date(), { days: 1 });

    const rent1 = await createRent.execute({
      customer_id: customer.id,
      address_id: address.id,
      rent_date,
      rental_items: [
        {
          product_id: product1.id,
          quantity: 1,
          value: 60,
        },
      ],
      payment_status: 'Pago',
      payment_way: 'Dinheiro',
      total_value: 60,
    });

    const rent2 = await createRent.execute({
      customer_id: customer.id,
      address_id: address.id,
      rent_date,
      rental_items: [
        {
          product_id: product1.id,
          quantity: 1,
          value: 60,
        },
      ],
      payment_status: 'Pago',
      payment_way: 'Dinheiro',
      total_value: 60,
    });

    await createRent.execute({
      customer_id: customer.id,
      address_id: address.id,
      rent_date,
      rental_items: [
        {
          product_id: product2.id,
          quantity: 1,
          value: 60,
        },
      ],
      payment_status: 'Pago',
      payment_way: 'Dinheiro',
      total_value: 60,
    });

    const rents = await listRentsByProduct.execute(product1.id);

    expect(rents).toEqual([rent1, rent2]);
  });

  it('should not be able to list rents by a nonexistent product', async () => {
    await expect(
      listRentsByProduct.execute('nonexistent-product-id'),
    ).rejects.toEqual(new AppError("Product doesn't exist.", 400));
  });
});
