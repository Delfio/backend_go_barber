import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import AppErrors from '@shared/errors/AppError';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
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
      const appointmentDate = startOfHour(date);

      const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
        appointmentDate,
      );
      if (findAppointmentInSameDate) {
        throw new AppErrors('Já existe um agendamento nessa hora');
      }

      const appointment = await this.appointmentsRepository.create({
        provider_id, date: appointmentDate, user_id,
      });

      return appointment;
    } catch (err) {
      throw new AppErrors(err.message);
    }
  }
}
