import AppError from '../../../shared/errors/AppError';
import FakeAddressCustomersRepository from '../repositories/fakes/FakeAddressCustomersRepository';
import FakeAddressesRepository from '../repositories/fakes/FakeAddressesRepository';
import FakeCustomersRepository from '../../customers/repositories/fakes/FakeCustomersRepository';
import CreateAddressService from './CreateAddressService';
import CreateCustomerService from '../../customers/services/CreateCustomerService';

describe('CreateAddress', () => {
  it('should be able to create a new address', async () => {
    const fakeAddressCustomersRepository = new FakeAddressCustomersRepository();
    const fakeAddressesRepository = new FakeAddressesRepository();
    const fakeCustomersRepository = new FakeCustomersRepository();

    const createAddress = new CreateAddressService(
      fakeAddressesRepository,
      fakeAddressCustomersRepository,
      fakeCustomersRepository,
    );

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
    const fakeAddressCustomersRepository = new FakeAddressCustomersRepository();
    const fakeAddressesRepository = new FakeAddressesRepository();
    const fakeCustomersRepository = new FakeCustomersRepository();

    const createCustomer = new CreateCustomerService(fakeCustomersRepository);

    const createAddress = new CreateAddressService(
      fakeAddressesRepository,
      fakeAddressCustomersRepository,
      fakeCustomersRepository,
    );

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
    const fakeAddressCustomersRepository = new FakeAddressCustomersRepository();
    const fakeAddressesRepository = new FakeAddressesRepository();
    const fakeCustomersRepository = new FakeCustomersRepository();

    const createAddress = new CreateAddressService(
      fakeAddressesRepository,
      fakeAddressCustomersRepository,
      fakeCustomersRepository,
    );

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
