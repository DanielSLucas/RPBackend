import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ShowCustomerAddressService from '../../../services/ShowCustomerAddressService';

export default class AdressCustomerController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCustomerAddress = container.resolve(ShowCustomerAddressService);

    const addressCustomer = await showCustomerAddress.execute(id);

    return response.json(addressCustomer);
  }
}
