import FakeCustomersRepository from '../repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from './CreateCustomerService';
import ListCustomersService from './ListCustomersService';

describe('ListCustomers', () => {
  it('should be able to list customers', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const createCustomer = new CreateCustomerService(fakeCustomersRepository);
    const listCustomers = new ListCustomersService(fakeCustomersRepository);

    const customer1 = await createCustomer.execute({
      name: 'Daniel Lucas',
      whatsapp: '12981025796',
      cpf: '46479951867',
    });

    const customer2 = await createCustomer.execute({
      name: 'Lucas',
      whatsapp: '12981025796',
      cpf: '46479951868',
    });

    const customers = await listCustomers.execute();

    expect(customers).toEqual([customer1, customer2]);
  });
});
