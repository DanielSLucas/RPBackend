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
import UpdateRentService from './UpdateRentService';
import { add } from 'date-fns';

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
let updateRent: UpdateRentService;

describe('UpdateRent', () => {
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

    updateRent = new UpdateRentService(
      fakeRentsRepository,
      fakeRentalItemsRepository,
    );
  });

  it('should be able to update a rent', async () => {
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
      quantity: 2,
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
      payment_status: 'Pendente',
      payment_way: 'Dinheiro',
      total_value: 60,
    });

    const rent = await updateRent.execute(createdRent.id, {
      customer_id: customer.id,
      address_id: address.id,
      rent_date,
      rental_items: [
        {
          product_id: product.id,
          quantity: 2,
          value: 120,
        },
      ],
      payment_status: 'Pago',
      payment_way: 'Dinheiro',
      total_value: 120,
    });

    expect(rent).toEqual({
      id: rent.id,
      rent_date,
      total_value: 120,
      payment_status: 'Pago',
      payment_way: 'Dinheiro',
      customer_id: customer.id,
      address_id: address.id,
    });
  });

  it('should not be able to update a nonexistent rent', async () => {
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

    const rent_date = add(new Date(), { days: 1 });

    await expect(
      updateRent.execute('nonexistent-rent-id', {
        customer_id: customer.id,
        address_id: address.id,
        rent_date,
        rental_items: [
          {
            product_id: product.id,
            quantity: 2,
            value: 120,
          },
        ],
        payment_status: 'Pago',
        payment_way: 'Dinheiro',
        total_value: 120,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a rent in a past date', async () => {
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
      payment_status: 'Pendente',
      payment_way: 'Dinheiro',
      total_value: 60,
    });

    const past_date = new Date(2020, 1, 11);

    await expect(
      updateRent.execute(createdRent.id, {
        customer_id: customer.id,
        address_id: address.id,
        rent_date: past_date,
        rental_items: [
          {
            product_id: product.id,
            quantity: 2,
            value: 120,
          },
        ],
        payment_status: 'Pago',
        payment_way: 'Dinheiro',
        total_value: 120,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
