import AppError from '../../../shared/errors/AppError';
import FakeCustomersRepository from '../repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from './CreateCustomerService';
import UpdateCustomerService from './UpdateCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;
let updateCustomer: UpdateCustomerService;

describe('UpdateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    updateCustomer = new UpdateCustomerService(fakeCustomersRepository);
  });

  it('should be able to update a customer', async () => {
    const createCustomer = new CreateCustomerService(fakeCustomersRepository);

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
    await expect(
      updateCustomer.execute('nonexistent-user-id', {
        name: 'Daniel Lucas P M Santos',
        whatsapp: '12981025796',
        cpf: '46479951867',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
