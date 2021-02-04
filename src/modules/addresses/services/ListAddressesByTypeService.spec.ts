import FakeAddressCustomersRepository from '../repositories/fakes/FakeAddressCustomersRepository';
import FakeAddressesRepository from '../repositories/fakes/FakeAddressesRepository';
import FakeCustomersRepository from '../../customers/repositories/fakes/FakeCustomersRepository';
import CreateAddressService from './CreateAddressService';
import ListAddressesByTypeService from './ListAddressesByTypeService';

let fakeAddressCustomersRepository: FakeAddressCustomersRepository;
let fakeAddressesRepository: FakeAddressesRepository;
let fakeCustomersRepository: FakeCustomersRepository;

let createAddress: CreateAddressService;
let listAddresses: ListAddressesByTypeService;

describe('ListAddress', () => {
  beforeEach(() => {
    fakeAddressCustomersRepository = new FakeAddressCustomersRepository();
    fakeAddressesRepository = new FakeAddressesRepository();
    fakeCustomersRepository = new FakeCustomersRepository();

    createAddress = new CreateAddressService(
      fakeAddressesRepository,
      fakeAddressCustomersRepository,
      fakeCustomersRepository,
    );
    listAddresses = new ListAddressesByTypeService(fakeAddressesRepository);
  });

  it('should be able to list all addresses', async () => {
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
