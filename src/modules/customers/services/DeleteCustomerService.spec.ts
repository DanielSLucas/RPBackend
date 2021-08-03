import AppError from '../../../shared/errors/AppError';
import FakeCustomersRepository from '../repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from './CreateCustomerService';
import DeleteCustomerService from './DeleteCustomerService';
import ListCustomersService from './ListCustomersService';

let fakeCustomersRepository: FakeCustomersRepository;
let deleteCustomer: DeleteCustomerService;

describe('DeleteCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    deleteCustomer = new DeleteCustomerService(fakeCustomersRepository);
  });

  it('should be able to delete a customer', async () => {
    const createCustomer = new CreateCustomerService(fakeCustomersRepository);
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
    await expect(deleteCustomer.execute('nonexistent-user-id')).rejects.toEqual(
      new AppError("Customer doesn't exists.", 400),
    );
  });
});
