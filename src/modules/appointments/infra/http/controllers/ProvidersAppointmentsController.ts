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
      appointment.provider = classToClass(appointment.provider);
      appointment.user = classToClass(appointment.user);
      return appointment;
    })

    return response.json(formatedAppointments);
  }
}
