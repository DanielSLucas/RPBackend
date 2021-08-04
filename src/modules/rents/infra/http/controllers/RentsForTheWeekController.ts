import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import ListRentsForTheWeekService from '../../../services/ListRentsForTheWeekService';

export default class RentsForTheWeekController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { date } = request.query;

    const parsedDate = parseISO((date as string) || new Date().toISOString());

    const listRentsForTheWeek = container.resolve(ListRentsForTheWeekService);

    const rents = await listRentsForTheWeek.execute(parsedDate);

    return response.json(rents);
  }
}
