import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateUserService from '../../../services/CreateUserService';
import ListUsersService from '../../../services/ListUsersService';
import UpdateUserService from '../../../services/UpdateUserService';
import DeleteUserService from '../../../services/DeleteUserService';
import ShowUserService from '../../../services/ShowUserService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = container.resolve(ListUsersService);

    const users = await listUsers.execute();

    return response.json(users);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUser = container.resolve(ShowUserService);

    const user = await showUser.execute(id);

    return response.json(user);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, whatsapp, password, role } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      whatsapp,
      password,
      role,
    });

    return response.status(201).json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, whatsapp, password, role } = request.body;

    const createProduct = container.resolve(UpdateUserService);

    const product = await createProduct.execute({
      user_id: id,
      name,
      email,
      whatsapp,
      password,
      role,
    });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute(id);

    return response.json({ message: 'User deleted!' });
  }
}
