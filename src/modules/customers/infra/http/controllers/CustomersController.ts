import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateCustomerService from '../../../services/CreateCustomerService';

export default class CustomersController {
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
}
