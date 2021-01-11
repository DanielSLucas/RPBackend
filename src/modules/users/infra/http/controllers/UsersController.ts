import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateUserService from '../../../services/CreateUserService';

export default class UsersController {
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

    delete user.password;

    return response.json(user);
  }
}
