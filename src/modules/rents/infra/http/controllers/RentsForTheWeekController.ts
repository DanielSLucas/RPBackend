import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import ListRentsForTheWeekService from '../../../services/ListRentsForTheWeekService';

export default class RentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { date } = request.body;

    const parsedDate = parseISO(date);

    const listRentsForTheWeek = container.resolve(ListRentsForTheWeekService);

    const rents = await listRentsForTheWeek.execute(parsedDate);

    return response.json(rents);
  }
}
