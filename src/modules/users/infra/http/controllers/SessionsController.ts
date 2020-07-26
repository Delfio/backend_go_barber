/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import SessionService from '@modules/users/services/AuthenticateUserService';
import { container } from 'tsyringe';

export default class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(SessionService);

    const { User, token } = await authenticateUser.execute({
      email, password,
    });

    delete User?.password;

    return response.json({ User, token });
  }
}
