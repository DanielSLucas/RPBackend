import AppError from '../../../shared/errors/AppError';
import FakeAddressCustomersRepository from '../repositories/fakes/FakeAddressCustomersRepository';
import FakeAddressesRepository from '../repositories/fakes/FakeAddressesRepository';
import FakeCustomersRepository from '../../customers/repositories/fakes/FakeCustomersRepository';
import CreateAddressService from './CreateAddressService';
import ShowAddressService from './ShowAddressService';
import { AddressTypes } from '../infra/typeorm/entities/Address';

let fakeAddressCustomersRepository: FakeAddressCustomersRepository;
let fakeAddressesRepository: FakeAddressesRepository;
let fakeCustomersRepository: FakeCustomersRepository;

let createAddress: CreateAddressService;
let showAddress: ShowAddressService;

describe('ShowAddress', () => {
  beforeEach(() => {
    fakeAddressCustomersRepository = new FakeAddressCustomersRepository();
    fakeAddressesRepository = new FakeAddressesRepository();
    fakeCustomersRepository = new FakeCustomersRepository();

    createAddress = new CreateAddressService(
      fakeAddressesRepository,
      fakeAddressCustomersRepository,
      fakeCustomersRepository,
    );
    showAddress = new ShowAddressService(fakeAddressesRepository);
  });

  it('should be able to show an address', async () => {
    const createdAddress = await createAddress.execute({
      description: 'Endereço de PERSONAL',
      postal_code: '12605-390',
      city: 'Lorena',
      neighborhood: 'Vila Passos',
      street: 'Mario P de Aquino Filho',
      number: '529',
      address_type: AddressTypes.PERSONAL,
    });

    const address = await showAddress.execute(createdAddress.id);

    expect(address).toEqual(createdAddress);
  });

  it('should not be able to show a nonexistent address', async () => {
    await expect(showAddress.execute('nonexistent-address-id')).rejects.toEqual(
      new AppError("Address doesn't exist."),
    );
  });
});
