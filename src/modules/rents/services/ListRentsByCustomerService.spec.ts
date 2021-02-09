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
import ListRentsByCustomerService from './ListRentsByCustomerService';

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
let listRentsByCustomer: ListRentsByCustomerService;

describe('ListRentsByCustomer', () => {
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
      fakeRentsRepository,
      fakeRentalItemsRepository,
    );

    listRentsByCustomer = new ListRentsByCustomerService(
      fakeCustomersRepository,
      fakeRentsRepository,
    );
  });

  it('should be able to list rents that belongs to a specified customer', async () => {
    const customer1 = await createCustomer.execute({
      name: 'Daniel Lucas',
      whatsapp: '12981025796',
      cpf: '46479951867',
    });

    const customer2 = await createCustomer.execute({
      name: 'Daniel Lucas',
      whatsapp: '12981025796',
      cpf: '46479951868',
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
      quantity: 2,
      value: 60,
      product_type: 'Bolos',
    });

    const rent_date = new Date(2021, 1, 11);

    const rent1 = await createRent.execute({
      customer_id: customer1.id,
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
      customer_id: customer2.id,
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

    const rents = await listRentsByCustomer.execute(customer1.id);

    expect(rents).toEqual([rent1]);
  });

  it('should not be able to list rents by a nonexistent customer', async () => {
    await expect(
      listRentsByCustomer.execute('nonexistent-customer-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
