import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateAddressService from '../../../services/CreateAddressService';
import ListAddressesByTypeService from '../../../services/ListAddressesByTypeService';

export default class AdressesController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
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

      return response.json(address);
    } catch (err) {
      return response.json(err);
    }
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { address_type } = request.body;
    const listAddresses = container.resolve(ListAddressesByTypeService);

    const addresses = await listAddresses.execute(address_type || undefined);

    return response.json(addresses);
  }

  // public async show(request: Request, response: Response): Promise<Response> {
  //   const { id } = request.params;

  //   const showCustomer = container.resolve(ShowCustomerService);

  //   const customer = await showCustomer.execute(id);

  //   return response.json(customer);
  // }

  // public async update(request: Request, response: Response): Promise<Response> {
  //   const { id } = request.params;
  //   const { name, whatsapp, cpf } = request.body;

  //   const updateCustomer = container.resolve(UpdateCustomerService);

  //   const customer = await updateCustomer.execute(id, {
  //     name,
  //     whatsapp,
  //     cpf,
  //   });

  //   return response.json(customer);
  // }

  // public async delete(request: Request, response: Response): Promise<Response> {
  //   const { id } = request.params;

  //   const deleteCustomer = container.resolve(DeleteCustomerService);

  //   await deleteCustomer.execute(id);

  //   return response.json({ message: 'Customer deleted!' });
  // }
}
