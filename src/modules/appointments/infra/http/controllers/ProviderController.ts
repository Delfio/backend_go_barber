import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import { classToClass } from 'class-transformer';

export default class ProviderController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listProvidersService = container.resolve(ListProvidersService);

    const providers = await listProvidersService.execute({
      user_id: id,
    });

    const result = providers.map((user) => classToClass(user))
    return response.json(result);
  }
}
