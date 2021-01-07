/* eslint-disable no-param-reassign */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProvidersAppointments from '@modules/appointments/services/ListProvidersAppointments';
import { classToClass } from 'class-transformer';

export default class ProvidersAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const {
      month,
      year,
      day,
    } = request.query;

    const listProvidersAppointments = container
      .resolve(ListProvidersAppointments);

    const appointments = await listProvidersAppointments
      .execute({
        month: Number(month),
        provider_id: id,
        year: Number(year),
        day: Number(day),
      });

    return response.json(appointments);
  }
}
