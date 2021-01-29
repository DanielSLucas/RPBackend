import AppError from '../../../shared/errors/AppError';
import FakeAddressCustomersRepository from '../repositories/fakes/FakeAddressCustomersRepository';
import FakeAddressesRepository from '../repositories/fakes/FakeAddressesRepository';
import FakeCustomersRepository from '../../customers/repositories/fakes/FakeCustomersRepository';
import CreateAddressService from './CreateAddressService';
import DeleteAddressService from './DeleteAddressService';
import ListAddressesByTypeService from './ListAddressesByTypeService';

let fakeAddressCustomersRepository: FakeAddressCustomersRepository;
let fakeAddressesRepository: FakeAddressesRepository;
let fakeCustomersRepository: FakeCustomersRepository;

let createAddress: CreateAddressService;
let deleteAddress: DeleteAddressService;

describe('DeleteAddress', () => {
  beforeEach(() => {
    fakeAddressCustomersRepository = new FakeAddressCustomersRepository();
    fakeAddressesRepository = new FakeAddressesRepository();
    fakeCustomersRepository = new FakeCustomersRepository();

    createAddress = new CreateAddressService(
      fakeAddressesRepository,
      fakeAddressCustomersRepository,
      fakeCustomersRepository,
    );
    deleteAddress = new DeleteAddressService(fakeAddressesRepository);
  });

  it('should be able to delete an address', async () => {
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
      description: 'Segundo endereço de cobrança',
      postal_code: '12605-390',
      city: 'Lorena',
      neighborhood: 'Vila Passos',
      street: 'Mario P de Aquino Filho',
      number: '529',
      address_type: 'Cobrança',
    });

    await deleteAddress.execute(address1.id);

    const addresses = await listAddresses.execute();

    expect(addresses).toEqual([address2]);
  });

  it('should not be able to delete a nonexistent address', async () => {
    await expect(
      deleteAddress.execute('nonexistent-address-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
