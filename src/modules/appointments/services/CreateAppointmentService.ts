/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment, { Iappointment } from '@modules/appointments/infra/typeorm/entities/Appointments';
import AppointmentRepository from '@modules/appointments/repositories/AppointmentsRepositorys';
import AppErrors from '@shared/errors/AppError';

export default class CreateAppointmentService {
  public async execute({ date, provider_id }: Omit<Iappointment, 'id'>): Promise<Appointment> {
    try {
      const appointmentDate = startOfHour(date);
      const appointmentsRepository = getCustomRepository(AppointmentRepository);

      const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);
      if (findAppointmentInSameDate) {
        throw new AppErrors('Já existe um agendamento nessa hora');
      }

      const appointment = appointmentsRepository.create({
        provider_id, date: appointmentDate,
      });

      await appointmentsRepository.save(appointment);

      return appointment;
    } catch (err) {
      throw new AppErrors(err.message);
    }
  }
}
