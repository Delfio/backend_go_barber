import {
  startOfHour, isBefore, getHours, format,
} from 'date-fns';
import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import INotificationsRepositories from '@modules/notifications/repositories/INotificationsRepositorie';
import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';
import { ICreateAppointmentDTO } from '../dtos';
import IAppointmentEntity from '../entities/IAppointmentEntity';
import AppointmentsCacheKey from '../utils/AppointmentsConstants';

@injectable()
export default class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepositories,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {
  }

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
        provider_id,
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
      });

      (async (): Promise<void> => {
        const data = {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
        }

        const cacheKey = AppointmentsCacheKey({
          ...data,
          provider_id,
        });

        await this.cacheProvider
          .invalidade(cacheKey);
      })()

      return appointment;
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}
