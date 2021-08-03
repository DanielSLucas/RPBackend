import AppError from '../../../shared/errors/AppError';
import FakeAddressCustomersRepository from '../repositories/fakes/FakeAddressCustomersRepository';
import FakeAddressesRepository from '../repositories/fakes/FakeAddressesRepository';
import FakeCustomersRepository from '../../customers/repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from '../../customers/services/CreateCustomerService';
import CreateAddressService from './CreateAddressService';
import ShowCustomerAddressService from './ShowCustomerAddressService';

let fakeAddressCustomersRepository: FakeAddressCustomersRepository;
let fakeAddressesRepository: FakeAddressesRepository;
let fakeCustomersRepository: FakeCustomersRepository;

let createCustomer: CreateCustomerService;
let createAddress: CreateAddressService;
let showCustomerAddress: ShowCustomerAddressService;

describe('CreateAddress', () => {
  beforeEach(() => {
    fakeAddressCustomersRepository = new FakeAddressCustomersRepository();
    fakeAddressesRepository = new FakeAddressesRepository();
    fakeCustomersRepository = new FakeCustomersRepository();

    createCustomer = new CreateCustomerService(fakeCustomersRepository);

    createAddress = new CreateAddressService(
      fakeAddressesRepository,
      fakeAddressCustomersRepository,
      fakeCustomersRepository,
    );

    showCustomerAddress = new ShowCustomerAddressService(
      fakeAddressCustomersRepository,
      fakeCustomersRepository,
    );
  });

  it('should be able to show the address of a specific customer', async () => {
    const customer = await createCustomer.execute({
      name: 'Daniel Lucas',
      whatsapp: '12981025796',
      cpf: '46479951867',
    });

    await createAddress.execute({
      customer_id: customer.id,
      description: 'Casa do Douglas de Souza',
      postal_code: '12605-390',
      city: 'Lorena',
      neighborhood: 'Vila Passos',
      street: 'Mario P de Aquino Filho',
      number: '529',
      address_type: 'Cobrança',
    });

    const addressCustomer = await showCustomerAddress.execute(customer.id);

    expect(addressCustomer).toHaveProperty('id');
    expect(addressCustomer).toHaveProperty('address_id');
    expect(addressCustomer).toHaveProperty('customer_id');
  });

  it('should not be able to show the address of a nonexistent customer', async () => {
    await expect(
      showCustomerAddress.execute('nonexistent-customer-id'),
    ).rejects.toEqual(new AppError("Customer doesn't exist.", 400));
  });

  it('should not be able to show a nonexistent address', async () => {
    const customer = await createCustomer.execute({
      name: 'Daniel Lucas',
      whatsapp: '12981025796',
      cpf: '46479951867',
    });

    await expect(showCustomerAddress.execute(customer.id)).rejects.toEqual(
      new AppError('Customer address not found.', 404),
    );
  });
});
