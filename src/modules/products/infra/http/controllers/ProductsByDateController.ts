import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import ListAvailableProductsInASpecificDateService from '../../../services/ListAvailableProductsInASpecificDateService';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { date } = request.query;

    const listProduct = container.resolve(
      ListAvailableProductsInASpecificDateService,
    );

    const parsedDate = parseISO((date as string) || new Date().toISOString());

    const products = await listProduct.execute(parsedDate);

    return response.json(products);
  }
}
