import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListRentsByCustomer from '../../../services/ListRentsByCustomerService';

export default class RentsByCustomerController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listRentsByCustomer = container.resolve(ListRentsByCustomer);

    const rents = await listRentsByCustomer.execute(id);

    return response.json(rents);
  }
}
