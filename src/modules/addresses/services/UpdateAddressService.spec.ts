import AppError from '../../../shared/errors/AppError';
import FakeAddressCustomersRepository from '../repositories/fakes/FakeAddressCustomersRepository';
import FakeAddressesRepository from '../repositories/fakes/FakeAddressesRepository';
import FakeCustomersRepository from '../../customers/repositories/fakes/FakeCustomersRepository';
import CreateAddressService from './CreateAddressService';
import UpdateAddressService from './UpdateAddressService';

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
      description: 'Endereço de cobrança',
      postal_code: '12605-390',
      city: 'Lorena',
      neighborhood: 'Vila Passos',
      street: 'Mario P de Aquino Filho',
      number: '529',
      address_type: 'Cobrança',
    });

    const address = await updateAddress.execute(createdAddress.id, {
      description: 'Endereço de cobrança atualizado',
      postal_code: '12605-390',
      city: 'Lorena',
      neighborhood: 'Vila Passos',
      street: 'Mario P de Aquino Filho',
      number: '529',
      address_type: 'Cobrança',
    });

    expect(address).toEqual({
      id: createdAddress.id,
      description: 'Endereço de cobrança atualizado',
      postal_code: '12605-390',
      city: 'Lorena',
      neighborhood: 'Vila Passos',
      street: 'Mario P de Aquino Filho',
      number: '529',
      address_type: 'Cobrança',
    });
  });

  it('should not be able to update a nonexistent address', async () => {
    await expect(
      updateAddress.execute('nonexistent-address-id', {
        description: 'Endereço de cobrança atualizado',
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
