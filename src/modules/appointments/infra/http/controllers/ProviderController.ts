import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';


export default class ProviderController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listProvidersService = container.resolve(ListProvidersService);

    const providers = await listProvidersService.execute({
      user_id: id,
    });

    const result = providers.map((user) => {
      const {
        avatar, created_at, email, id: ProviderID, name, updated_at,
      } = user;
      return {
        avatar, created_at, email, ProviderID, name, updated_at,
      }
    })
    return response.json(result);
  }
}
