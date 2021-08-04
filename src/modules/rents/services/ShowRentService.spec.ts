import { add } from 'date-fns';
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
import ShowRentService from './ShowRentService';
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
let showRent: ShowRentService;

describe('ShowRent', () => {
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

    showRent = new ShowRentService(
      fakeRentsRepository,
      fakeRentalItemsRepository,
    );
  });

  it('should be able to show a rent', async () => {
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

    const product = await createProduct.execute({
      name: 'Bolo normal',
      quantity: 1,
      value: 60,
      product_type: 'Bolos',
    });

    const rent_date = add(new Date(), { days: 1 });

    const createdRent = await createRent.execute({
      customer_id: customer.id,
      address_id: address.id,
      rent_date,
      rental_items: [
        {
          product_id: product.id,
          quantity: 1,
          value: 60,
        },
      ],
      payment_status: 'Pago',
      payment_way: 'Dinheiro',
      total_value: 60,
    });

    const rent = await showRent.execute(createdRent.id);

    expect(rent).toHaveProperty('rent');
    expect(rent).toHaveProperty('rentedItems');
  });

  it('should not be able to show a nonexistent rent', async () => {
    await expect(showRent.execute('nonexistent-rent-id')).rejects.toEqual(
      new AppError("Rent doesn't exist."),
    );
  });
});
