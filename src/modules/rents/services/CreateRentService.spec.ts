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

describe('CreateRent', () => {
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
  });

  it('should be able to create a new rent', async () => {
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

    const product = await createProduct.execute({
      name: 'Bolo normal',
      quantity: 1,
      value: 60,
      product_type: 'Bolos',
    });

    const rent_date = new Date(2021, 1, 11);

    const rent = await createRent.execute({
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

    expect(rent).toHaveProperty('id');
    expect(rent).toEqual({
      id: rent.id,
      rent_date,
      total_value: 60,
      payment_status: 'Pago',
      payment_way: 'Dinheiro',
      customer_id: customer.id,
      address_id: address.id,
    });
  });

  it('should not be able to create a new rent for a nonexistent customer', async () => {
    const address = await createAddress.execute({
      description: 'Casa do Douglas de Souza',
      postal_code: '12605-390',
      city: 'Lorena',
      neighborhood: 'Vila Passos',
      street: 'Mario P de Aquino Filho',
      number: '529',
      address_type: 'Cobrança',
    });

    const product = await createProduct.execute({
      name: 'Bolo normal',
      quantity: 1,
      value: 60,
      product_type: 'Bolos',
    });

    const rent_date = new Date(2021, 1, 11);

    await expect(
      createRent.execute({
        customer_id: 'nonexistent-customer-id',
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
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rent with a nonexistent address', async () => {
    const customer = await createCustomer.execute({
      name: 'Daniel Lucas',
      whatsapp: '12981025796',
      cpf: '46479951867',
    });

    const product = await createProduct.execute({
      name: 'Bolo normal',
      quantity: 1,
      value: 60,
      product_type: 'Bolos',
    });

    const rent_date = new Date(2021, 1, 11);

    await expect(
      createRent.execute({
        customer_id: customer.id,
        address_id: 'nonexistent-address-id',
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
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rent in a past date', async () => {
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

    const product = await createProduct.execute({
      name: 'Bolo normal',
      quantity: 1,
      value: 60,
      product_type: 'Bolos',
    });

    const rent_date = new Date(1999, 1, 11);

    await expect(
      createRent.execute({
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
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
