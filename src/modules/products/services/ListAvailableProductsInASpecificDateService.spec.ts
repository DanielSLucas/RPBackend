import FakeRentsRepository from '../../rents/repositories/fakes/FakeRentsRepository';
import FakeRentalItemsRepository from '../../rents/repositories/fakes/FakeRentalItemsRepository';
import FakeCustomersRepository from '../../customers/repositories/fakes/FakeCustomersRepository';
import FakeAddressCustomersRepository from '../../addresses/repositories/fakes/FakeAddressCustomersRepository';
import FakeAddressesRepository from '../../addresses/repositories/fakes/FakeAddressesRepository';
import FakeProductRepository from '../repositories/fakes/FakeProductRepository';

import CreateCustomerService from '../../customers/services/CreateCustomerService';
import CreateAddressService from '../../addresses/services/CreateAddressService';
import CreateRentService from '../../rents/services/CreateRentService';
import CreateProductService from './CreateProductService';
import ListAvailableProductsInASpecificDateService from './ListAvailableProductsInASpecificDateService';

let fakeAddressCustomersRepository: FakeAddressCustomersRepository;
let fakeAddressesRepository: FakeAddressesRepository;
let fakeCustomersRepository: FakeCustomersRepository;
let fakeProductRepository: FakeProductRepository;
let fakeRentsRepository: FakeRentsRepository;
let fakeRentalItemsRepository: FakeRentalItemsRepository;

let createAddress: CreateAddressService;
let createCustomer: CreateCustomerService;
let createProduct: CreateProductService;
let createRent: CreateRentService;
let listAvailableProductsInASpecificDateService: ListAvailableProductsInASpecificDateService;

describe('ListAvailableProductsByDate', () => {
  beforeEach(() => {
    fakeAddressCustomersRepository = new FakeAddressCustomersRepository();
    fakeAddressesRepository = new FakeAddressesRepository();
    fakeCustomersRepository = new FakeCustomersRepository();
    fakeProductRepository = new FakeProductRepository();
    fakeRentsRepository = new FakeRentsRepository();
    fakeRentalItemsRepository = new FakeRentalItemsRepository();

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
      fakeProductRepository,
      fakeRentsRepository,
      fakeRentalItemsRepository,
    );

    listAvailableProductsInASpecificDateService = new ListAvailableProductsInASpecificDateService(
      fakeProductRepository,
      fakeRentsRepository,
      fakeRentalItemsRepository,
    );
  });

  it('should be able to list available products in a specifc date', async () => {
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
      address_type: 'Cobrança',
    });

    const product1 = await createProduct.execute({
      name: 'Bolo normal',
      quantity: 1,
      value: 60,
      product_type: 'Bolos',
    });

    const product2 = await createProduct.execute({
      name: 'Arranjo vermelho GG',
      quantity: 4,
      value: 60,
      product_type: 'Bolos',
    });

    const rent_date = new Date(2021, 1, 11);

    await createRent.execute({
      customer_id: customer.id,
      address_id: address.id,
      rent_date,
      rental_items: [
        {
          product_id: product2.id,
          quantity: 2,
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
          quantity: 2,
          value: 60,
        },
      ],
      payment_status: 'Pago',
      payment_way: 'Dinheiro',
      total_value: 60,
    });

    const availableProducts = await listAvailableProductsInASpecificDateService.execute(
      rent_date,
    );

    expect(availableProducts).toEqual([
      product1,
      {
        ...product2,
        quantity: 0,
      },
    ]);
  });

  it('should list all products is there is no rents in this day', async () => {
    const product1 = await createProduct.execute({
      name: 'Bolo normal',
      quantity: 1,
      value: 60,
      product_type: 'Bolos',
    });

    const product2 = await createProduct.execute({
      name: 'Arranjo vermelho GG',
      quantity: 4,
      value: 60,
      product_type: 'Bolos',
    });

    const rent_date = new Date(2021, 1, 11);

    const availableProducts = await listAvailableProductsInASpecificDateService.execute(
      rent_date,
    );

    expect(availableProducts).toEqual([product1, product2]);
  });
});
