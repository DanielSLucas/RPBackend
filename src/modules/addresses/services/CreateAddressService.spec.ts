import AppError from '../../../shared/errors/AppError';
import FakeAddressCustomersRepository from '../repositories/fakes/FakeAddressCustomersRepository';
import FakeAddressesRepository from '../repositories/fakes/FakeAddressesRepository';
import FakeCustomersRepository from '../../customers/repositories/fakes/FakeCustomersRepository';
import CreateAddressService from './CreateAddressService';
import CreateCustomerService from '../../customers/services/CreateCustomerService';

let fakeAddressCustomersRepository: FakeAddressCustomersRepository;
let fakeAddressesRepository: FakeAddressesRepository;
let fakeCustomersRepository: FakeCustomersRepository;

let createAddress: CreateAddressService;
describe('CreateAddress', () => {
  beforeEach(() => {
    fakeAddressCustomersRepository = new FakeAddressCustomersRepository();
    fakeAddressesRepository = new FakeAddressesRepository();
    fakeCustomersRepository = new FakeCustomersRepository();

    createAddress = new CreateAddressService(
      fakeAddressesRepository,
      fakeAddressCustomersRepository,
      fakeCustomersRepository,
    );
  });

  it('should be able to create a new address', async () => {
    const address = await createAddress.execute({
      description: 'Casa do Douglas de Souza',
      postal_code: '12605-390',
      city: 'Lorena',
      neighborhood: 'Vila Passos',
      street: 'Mario P de Aquino Filho',
      number: '529',
      address_type: 'Cobrança',
    });

    expect(address).toHaveProperty('id');
    expect(address).toEqual({
      id: address.id,
      description: 'Casa do Douglas de Souza',
      postal_code: '12605-390',
      city: 'Lorena',
      neighborhood: 'Vila Passos',
      street: 'Mario P de Aquino Filho',
      number: '529',
      address_type: 'Cobrança',
    });
  });

  it('should be able to create a new address for a specific customer', async () => {
    const createCustomer = new CreateCustomerService(fakeCustomersRepository);

    const customer = await createCustomer.execute({
      name: 'Daniel Lucas',
      whatsapp: '12981025796',
      cpf: '46479951867',
    });

    const address = await createAddress.execute({
      customer_id: customer.id,
      description: 'Casa do Douglas de Souza',
      postal_code: '12605-390',
      city: 'Lorena',
      neighborhood: 'Vila Passos',
      street: 'Mario P de Aquino Filho',
      number: '529',
      address_type: 'Cobrança',
    });

    expect(address).toHaveProperty('id');
    expect(address).toEqual({
      id: address.id,
      description: 'Casa do Douglas de Souza',
      postal_code: '12605-390',
      city: 'Lorena',
      neighborhood: 'Vila Passos',
      street: 'Mario P de Aquino Filho',
      number: '529',
      address_type: 'Cobrança',
    });
  });

  it('should not be able to create a new address for a nonexistent customer', async () => {
    await expect(
      createAddress.execute({
        customer_id: 'nonexistent-customer-id',
        description: 'Casa do Douglas de Souza',
        postal_code: '12605-390',
        city: 'Lorena',
        neighborhood: 'Vila Passos',
        street: 'Mario P de Aquino Filho',
        number: '529',
        address_type: 'Cobrança',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
