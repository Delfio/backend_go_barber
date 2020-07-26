/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentsServices from '@modules/appointments/services/CreateAppointmentService';


export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    const parseDate = parseISO(date);
    const appointmentServices = container.resolve(CreateAppointmentsServices);

    const appointment = await appointmentServices.execute({
      date: parseDate,
      provider_id,
    });

    return response.json(appointment);
  }
}
