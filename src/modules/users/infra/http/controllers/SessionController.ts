import { container } from 'tsyringe';
import { Request, Response } from 'express';

import AuthenticateUserService from '../../../services/AuthenticateUserService';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = container.resolve(AuthenticateUserService);

    const { token, user } = await createSession.execute({
      email,
      password,
    });

    delete user.password;
    delete user.role;

    return response.json({ token, user });
  }
}
