// import AppError from '../../../shared/errors/AppError';
import FakeAddressCustomersRepository from '../repositories/fakes/FakeAddressCustomersRepository';
import FakeAddressesRepository from '../repositories/fakes/FakeAddressesRepository';
import FakeCustomersRepository from '../../customers/repositories/fakes/FakeCustomersRepository';
import CreateAddressService from './CreateAddressService';
import ListAddressesByTypeService from './ListAddressesByTypeService';

describe('ListAddress', () => {
  it('should be able to list all addresses', async () => {
    const fakeAddressCustomersRepository = new FakeAddressCustomersRepository();
    const fakeAddressesRepository = new FakeAddressesRepository();
    const fakeCustomersRepository = new FakeCustomersRepository();

    const createAddress = new CreateAddressService(
      fakeAddressesRepository,
      fakeAddressCustomersRepository,
      fakeCustomersRepository,
    );
    const listAddresses = new ListAddressesByTypeService(
      fakeAddressesRepository,
    );

    const address1 = await createAddress.execute({
      description: 'Endereço de cobrança',
      postal_code: '12605-390',
      city: 'Lorena',
      neighborhood: 'Vila Passos',
      street: 'Mario P de Aquino Filho',
      number: '529',
      address_type: 'Cobrança',
    });

    const address2 = await createAddress.execute({
      description: 'Salão de festas',
      postal_code: '12605-390',
      city: 'Lorena',
      neighborhood: 'Vila Passos',
      street: 'Mario P de Aquino Filho',
      number: '529',
      address_type: 'Salão',
    });

    const addresses = await listAddresses.execute();

    expect(addresses).toEqual([address1, address2]);
  });

  it('should be able list addresses filtered by type', async () => {
    const fakeAddressCustomersRepository = new FakeAddressCustomersRepository();
    const fakeAddressesRepository = new FakeAddressesRepository();
    const fakeCustomersRepository = new FakeCustomersRepository();

    const createAddress = new CreateAddressService(
      fakeAddressesRepository,
      fakeAddressCustomersRepository,
      fakeCustomersRepository,
    );
    const listAddresses = new ListAddressesByTypeService(
      fakeAddressesRepository,
    );

    await createAddress.execute({
      description: 'Endereço de cobrança',
      postal_code: '12605-390',
      city: 'Lorena',
      neighborhood: 'Vila Passos',
      street: 'Mario P de Aquino Filho',
      number: '529',
      address_type: 'Cobrança',
    });

    const address2 = await createAddress.execute({
      description: 'Salão de festas',
      postal_code: '12605-390',
      city: 'Lorena',
      neighborhood: 'Vila Passos',
      street: 'Mario P de Aquino Filho',
      number: '529',
      address_type: 'Salão',
    });

    const addresses = await listAddresses.execute('Salão');

    expect(addresses).toEqual([address2]);
  });
});
