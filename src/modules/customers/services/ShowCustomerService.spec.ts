import AppError from '../../../shared/errors/AppError';
import FakeCustomersRepository from '../repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from './CreateCustomerService';
import ShowCustomerService from './ShowCustomerService';

describe('ShowCustomer', () => {
  it('should be able to show a customer', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const createCustomer = new CreateCustomerService(fakeCustomersRepository);
    const showCustomer = new ShowCustomerService(fakeCustomersRepository);

    const createdCustomer = await createCustomer.execute({
      name: 'Daniel Lucas',
      whatsapp: '12981025796',
      cpf: '46479951867',
    });

    const customer = await showCustomer.execute(createdCustomer.id);

    expect(customer).toEqual({
      id: createdCustomer.id,
      name: 'Daniel Lucas',
      whatsapp: '12981025796',
      cpf: '46479951867',
    });
  });

  it('should not be able to show a nonexistent customer', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const createCustomer = new CreateCustomerService(fakeCustomersRepository);
    const showCustomer = new ShowCustomerService(fakeCustomersRepository);

    await createCustomer.execute({
      name: 'Daniel Lucas',
      whatsapp: '12981025796',
      cpf: '46479951867',
    });

    await expect(
      showCustomer.execute('nonexistent-customer-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
