import AppError from '../../../shared/errors/AppError';
import FakeCustomersRepository from '../repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from './CreateCustomerService';
import DeleteCustomerService from './DeleteCustomerService';
import ListCustomersService from './ListCustomersService';

describe('DeleteCustomer', () => {
  it('should be able to delete a customer', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const createCustomer = new CreateCustomerService(fakeCustomersRepository);
    const deleteCustomer = new DeleteCustomerService(fakeCustomersRepository);
    const listCustomers = new ListCustomersService(fakeCustomersRepository);

    const customer1 = await createCustomer.execute({
      name: 'Daniel Lucas',
      whatsapp: '12981025796',
      cpf: '46479951867',
    });

    const customer2 = await createCustomer.execute({
      name: 'Daniel Lucas',
      whatsapp: '12981025796',
      cpf: '46479951868',
    });

    await deleteCustomer.execute(customer1.id);

    const customers = await listCustomers.execute();

    expect(customers).toEqual([customer2]);
  });

  it('should not be able to delete a nonexistent customer', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const deleteCustomer = new DeleteCustomerService(fakeCustomersRepository);

    await expect(
      deleteCustomer.execute('nonexistent-user-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
