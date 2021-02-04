import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateRentService from '../../../services/CreateRentService';

export default class RentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const {
        customer_id,
        address_id,
        rent_date,
        rental_items,
        payment_status,
        payment_way,
        total_value,
      } = request.body;

      const createAddress = container.resolve(CreateRentService);

      const rent = await createAddress.execute({
        customer_id,
        address_id,
        rent_date,
        rental_items,
        payment_status,
        payment_way,
        total_value,
      });

      return response.json(rent);
    } catch (err) {
      return response.json(err);
    }
  }

  // public async index(request: Request, response: Response): Promise<Response> {
  //   const { address_type } = request.body;
  //   const listAddresses = container.resolve(ListAddressesByTypeService);

  //   const addresses = await listAddresses.execute(address_type || undefined);

  //   return response.json(addresses);
  // }

  // public async show(request: Request, response: Response): Promise<Response> {
  //   const { id } = request.params;

  //   const showAddress = container.resolve(ShowAddressService);

  //   const address = await showAddress.execute(id);

  //   return response.json(address);
  // }

  // public async update(request: Request, response: Response): Promise<Response> {
  //   const { id } = request.params;
  //   const {
  //     description,
  //     postal_code,
  //     city,
  //     neighborhood,
  //     street,
  //     number,
  //     address_type,
  //   } = request.body;

  //   const updateAddress = container.resolve(UpdateAddressService);

  //   const address = await updateAddress.execute(id, {
  //     description,
  //     postal_code,
  //     city,
  //     neighborhood,
  //     street,
  //     number,
  //     address_type,
  //   });

  //   return response.json(address);
  // }

  // public async delete(request: Request, response: Response): Promise<Response> {
  //   const { id } = request.params;

  //   const deleteAddress = container.resolve(DeleteAddressService);

  //   await deleteAddress.execute(id);

  //   return response.json({ message: 'Address deleted!' });
  // }
}
