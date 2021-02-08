import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import ListAvailableProductsInASpecificDateService from '../../../services/ListAvailableProductsInASpecificDateService';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { date } = request.body;

    const listProduct = container.resolve(
      ListAvailableProductsInASpecificDateService,
    );

    const parsedDate = parseISO(date);

    const products = await listProduct.execute(parsedDate);

    return response.json(products);
  }
}
