import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListRentsByProduct from '../../../services/ListRentsByProductService';

export default class RentsByProductController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listRentsByProduct = container.resolve(ListRentsByProduct);

    const rents = await listRentsByProduct.execute(id);

    return response.json(rents);
  }
}
