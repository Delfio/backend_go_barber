/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import { startOfHour } from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepositorys';

import IAppointmentDTO from '@modules/appointments/dtos/IAppointmentDTO';

import AppErrors from '@shared/errors/AppError';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

export default class CreateAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({ date, provider_id }: Omit<IAppointmentDTO, 'id'>): Promise<Appointment> {
    try {
      const appointmentDate = startOfHour(date);

      const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
        appointmentDate,
      );
      if (findAppointmentInSameDate) {
        throw new AppErrors('Já existe um agendamento nessa hora');
      }

      const appointment = await this.appointmentsRepository.create({
        provider_id, date: appointmentDate,
      });

      return appointment;
    } catch (err) {
      throw new AppErrors(err.message);
    }
  }
}
