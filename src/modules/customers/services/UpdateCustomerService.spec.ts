import AppError from '../../../shared/errors/AppError';
import FakeCustomersRepository from '../repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from './CreateCustomerService';
import UpdateCustomerService from './UpdateCustomerService';

describe('UpdateCustomer', () => {
  it('should be able to update a customer', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const createCustomer = new CreateCustomerService(fakeCustomersRepository);
    const updateCustomer = new UpdateCustomerService(fakeCustomersRepository);

    const customer = await createCustomer.execute({
      name: 'Daniel Lucas',
      whatsapp: '12981025796',
      cpf: '46479951867',
    });

    const updatedCustomer = await updateCustomer.execute(customer.id, {
      name: 'Daniel Lucas P M Santos',
      whatsapp: '12981025796',
      cpf: '46479951867',
    });

    expect(updatedCustomer).toEqual({
      id: customer.id,
      name: 'Daniel Lucas P M Santos',
      whatsapp: '12981025796',
      cpf: '46479951867',
    });
  });

  it('should not be able to update a nonexistent customer', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const createCustomer = new CreateCustomerService(fakeCustomersRepository);
    const updateCustomer = new UpdateCustomerService(fakeCustomersRepository);

    await createCustomer.execute({
      name: 'Daniel Lucas',
      whatsapp: '12981025796',
      cpf: '46479951867',
    });

    await expect(
      updateCustomer.execute('nonexistent-user-id', {
        name: 'Daniel Lucas P M Santos',
        whatsapp: '12981025796',
        cpf: '46479951867',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
