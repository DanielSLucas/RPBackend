import AppError from '../../../shared/errors/AppError';
import FakeAddressCustomersRepository from '../repositories/fakes/FakeAddressCustomersRepository';
import FakeAddressesRepository from '../repositories/fakes/FakeAddressesRepository';
import FakeCustomersRepository from '../../customers/repositories/fakes/FakeCustomersRepository';
import CreateAddressService from './CreateAddressService';
import UpdateAddressService from './UpdateAddressService';
import { AddressTypes } from '../infra/typeorm/entities/Address';

let fakeAddressCustomersRepository: FakeAddressCustomersRepository;
let fakeAddressesRepository: FakeAddressesRepository;
let fakeCustomersRepository: FakeCustomersRepository;

let createAddress: CreateAddressService;
let updateAddress: UpdateAddressService;

describe('UpdateAddress', () => {
  beforeEach(() => {
    fakeAddressCustomersRepository = new FakeAddressCustomersRepository();
    fakeAddressesRepository = new FakeAddressesRepository();
    fakeCustomersRepository = new FakeCustomersRepository();

    createAddress = new CreateAddressService(
      fakeAddressesRepository,
      fakeAddressCustomersRepository,
      fakeCustomersRepository,
    );
    updateAddress = new UpdateAddressService(fakeAddressesRepository);
  });

  it('should be able to update an address', async () => {
    const createdAddress = await createAddress.execute({
      description: 'Endereço de PERSONAL',
      postal_code: '12605-390',
      city: 'Lorena',
      neighborhood: 'Vila Passos',
      street: 'Mario P de Aquino Filho',
      number: '529',
      address_type: AddressTypes.PERSONAL,
    });

    const address = await updateAddress.execute(createdAddress.id, {
      description: 'Endereço de PERSONAL atualizado',
      postal_code: '12605-390',
      city: 'Lorena',
      neighborhood: 'Vila Passos',
      street: 'Mario P de Aquino Filho',
      number: '529',
      address_type: AddressTypes.PERSONAL,
    });

    expect(address).toEqual({
      id: createdAddress.id,
      description: 'Endereço de PERSONAL atualizado',
      postal_code: '12605-390',
      city: 'Lorena',
      neighborhood: 'Vila Passos',
      street: 'Mario P de Aquino Filho',
      number: '529',
      address_type: 'PERSONAL',
    });
  });

  it('should not be able to update a nonexistent address', async () => {
    await expect(
      updateAddress.execute('nonexistent-address-id', {
        description: 'Endereço de PERSONAL atualizado',
        postal_code: '12605-390',
        city: 'Lorena',
        neighborhood: 'Vila Passos',
        street: 'Mario P de Aquino Filho',
        number: '529',
        address_type: AddressTypes.PERSONAL,
      }),
    ).rejects.toEqual(new AppError("Address doesn't exist.", 400));
  });
});
