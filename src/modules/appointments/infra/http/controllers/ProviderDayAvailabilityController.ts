import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvailability from '@modules/appointments/services/ListProviderDayAvailability';

export default class ProviderDayAvailability {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const {
      month,
      year,
      day,
    } = request.query;

    const listProviderDayAvailability = container.resolve(ListProviderDayAvailability);

    const availability = await listProviderDayAvailability
      .execute({
        month: Number(month),
        provider_id,
        year: Number(year),
        day: Number(day),
      });

    return response.json(availability);
  }
}
