import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateAddressService from '../../../services/CreateAddressService';
import ListAddressesByTypeService from '../../../services/ListAddressesByTypeService';
import ShowAddressService from '../../../services/ShowAddressService';
import UpdateAddressService from '../../../services/UpdateAddressService';
import DeleteAddressService from '../../../services/DeleteAddressService';

export default class AdressesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      customer_id,
      description,
      postal_code,
      city,
      neighborhood,
      street,
      number,
      address_type,
    } = request.body;

    const createAddress = container.resolve(CreateAddressService);

    const address = await createAddress.execute({
      customer_id: customer_id || undefined,
      description,
      postal_code,
      city,
      neighborhood,
      street,
      number,
      address_type,
    });

    return response.status(201).json(address);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { address_type } = request.body;
    const listAddresses = container.resolve(ListAddressesByTypeService);

    const addresses = await listAddresses.execute(address_type || undefined);

    return response.json(addresses);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showAddress = container.resolve(ShowAddressService);

    const address = await showAddress.execute(id);

    return response.json(address);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      description,
      postal_code,
      city,
      neighborhood,
      street,
      number,
      address_type,
    } = request.body;

    const updateAddress = container.resolve(UpdateAddressService);

    const address = await updateAddress.execute(id, {
      description,
      postal_code,
      city,
      neighborhood,
      street,
      number,
      address_type,
    });

    return response.json(address);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteAddress = container.resolve(DeleteAddressService);

    await deleteAddress.execute(id);

    return response.json({ message: 'Address deleted!' });
  }
}
