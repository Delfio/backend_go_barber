/* eslint-disable class-methods-use-this */
import { Response, Request } from 'express';
import { classToClass } from 'class-transformer';

import { container } from 'tsyringe';
import CreatedUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createdUser = container.resolve(CreatedUserService);

    const user = await createdUser.execute({ name, email, password });

    return response.json({
      user: classToClass(user),
    });
  }
}
