import {
  startOfHour, isBefore, getHours, format,
} from 'date-fns';
import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import INotificationsRepositories from '@modules/notifications/repositories/INotificationsRepositorie';
import { ICreateAppointmentDTO } from '../dtos';
import IAppointmentEntity from '../entities/IAppointmentEntity';

@injectable()
export default class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepositories,
  ) {}

  public async execute(
    { date, provider_id, user_id }: ICreateAppointmentDTO,
  ): Promise<IAppointmentEntity> {
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

      const dateFormated = format(date, "dd/MM/yyyy 'às' HH:mm'h'");

      await this.notificationsRepository.create({
        content: `Novo agendamento para dia ${dateFormated}`,
        recipient_id: provider_id,
      })

      return appointment;
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}
