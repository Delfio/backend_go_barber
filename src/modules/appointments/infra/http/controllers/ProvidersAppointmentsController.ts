/* eslint-disable no-param-reassign */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProvidersAppointments from '@modules/appointments/services/ListProvidersAppointments';

export default class ProvidersAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const {
      month,
      year,
      day,
    } = request.body;

    const listProvidersAppointments = container
      .resolve(ListProvidersAppointments);

    const appointments = await listProvidersAppointments
      .execute({
        month,
        provider_id: id,
        year,
        day,
      });


    const formatedAppointments = appointments.map((appointment) => {
      delete appointment.provider.password;
      delete appointment.provider.created_at;
      delete appointment.provider.updated_at;
      delete appointment.user.password;
      delete appointment.user.created_at;
      delete appointment.user.updated_at;
      return appointment;
    })

    return response.json(formatedAppointments);
  }
}
