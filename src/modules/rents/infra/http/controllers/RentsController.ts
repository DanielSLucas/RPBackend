import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { parseISO } from 'date-fns';
import CreateRentService from '../../../services/CreateRentService';
import ShowRentService from '../../../services/ShowRentService';
import ListRentsService from '../../../services/ListRentsService';
import DeleteRentService from '../../../services/DeleteRentService';
import UpdateRentService from '../../../services/UpdateRentService';

export default class RentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      customer_id,
      address_id,
      rent_date,
      rental_items,
      payment_status,
      payment_way,
      total_value,
    } = request.body;

    const parsedDate = parseISO(rent_date);

    const createRent = container.resolve(CreateRentService);

    const rent = await createRent.execute({
      customer_id,
      address_id,
      rent_date: parsedDate,
      rental_items,
      payment_status,
      payment_way,
      total_value,
    });

    return response.status(201).json(rent);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listRents = container.resolve(ListRentsService);

    const rents = await listRents.execute();

    return response.json(rents);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showRent = container.resolve(ShowRentService);

    const rent = await showRent.execute(id);

    return response.json(rent);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteRent = container.resolve(DeleteRentService);

    await deleteRent.execute(id);

    return response.json({ message: 'Rent deleted!' });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      customer_id,
      address_id,
      rent_date,
      rental_items,
      payment_status,
      payment_way,
      total_value,
    } = request.body;

    const parsedDate = parseISO(rent_date);

    const updateRent = container.resolve(UpdateRentService);

    const rent = await updateRent.execute(id, {
      customer_id,
      address_id,
      rent_date: parsedDate,
      rental_items,
      payment_status,
      payment_way,
      total_value,
    });

    return response.json(rent);
  }
}
