import { startOfHour, isBefore, getHours } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import { ICreateAppointmentDTO } from '../dtos';

@injectable()
export default class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(
    { date, provider_id, user_id }: ICreateAppointmentDTO,
  ): Promise<Appointment> {
    try {
      if (isBefore(date, Date.now())) {
        throw new AppError('Yout Can\'t create an appointment on a past date!');
      }

      if (user_id === provider_id) {
        throw new AppError('You Can\'t create appointment with yourself');
      }
      const appointmentDate = startOfHour(date);


      if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
        throw new AppError('You can only create appointments btween 8am and 5pm!');
      }

      const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
        appointmentDate,
      );
      if (findAppointmentInSameDate) {
        throw new AppError('This appointment is already booked');
      }

      const appointment = await this.appointmentsRepository.create({
        provider_id, date: appointmentDate, user_id,
      });

      return appointment;
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}
