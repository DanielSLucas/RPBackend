import AppError from '../../../shared/errors/AppError';

import FakeCustomersRepository from '../repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from './CreateCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomersRepository);
  });

  it('should be able to create a new customer', async () => {
    const customer = await createCustomer.execute({
      name: 'Daniel Lucas',
      whatsapp: '12981025796',
      cpf: '46479951867',
    });

    expect(customer).toHaveProperty('id');
    expect(customer).toEqual({
      id: customer.id,
      name: 'Daniel Lucas',
      whatsapp: '12981025796',
      cpf: '46479951867',
    });
  });

  it('should not be able to create a new customer with same cpf from another', async () => {
    await createCustomer.execute({
      name: 'Daniel Lucas',
      whatsapp: '12981025796',
      cpf: '46479951867',
    });

    await expect(
      createCustomer.execute({
        name: 'Daniel Lucas',
        whatsapp: '12981025796',
        cpf: '46479951867',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
