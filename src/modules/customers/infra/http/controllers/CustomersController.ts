import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateCustomerService from '../../../services/CreateCustomerService';
import ListCustomersService from '../../../services/ListCustomersService';
import UpdateCustomerService from '../../../services/UpdateCustomerService';
import ShowCustomerService from '../../../services/ShowCustomerService';
import DeleteCustomerService from '../../../services/DeleteCustomerService';

export default class CustomersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomers = container.resolve(ListCustomersService);

    const customers = await listCustomers.execute();

    return response.json(customers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCustomer = container.resolve(ShowCustomerService);

    const customer = await showCustomer.execute(id);

    return response.json(customer);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, whatsapp, cpf } = request.body;

    const createCustomer = container.resolve(CreateCustomerService);

    const customer = await createCustomer.execute({
      name,
      whatsapp,
      cpf,
    });

    return response.json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, whatsapp, cpf } = request.body;

    const updateCustomer = container.resolve(UpdateCustomerService);

    const customer = await updateCustomer.execute(id, {
      name,
      whatsapp,
      cpf,
    });

    return response.json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomer = container.resolve(DeleteCustomerService);

    await deleteCustomer.execute(id);

    return response.json({ message: 'Customer deleted!' });
  }
}
