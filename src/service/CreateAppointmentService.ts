/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment, { Iappointment } from '../models/Appointments';
import AppointmentRepository from '../repository/AppointmentsRepositorys';

export default class CreateAppointmentService {
  public async execute({ date, provider }: Omit<Iappointment, 'id'>): Promise<Appointment> {
    try {
      const appointmentDate = startOfHour(date);
      const appointmentsRepository = getCustomRepository(AppointmentRepository);

      const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);
      if (findAppointmentInSameDate) {
        throw Error('Já existe um agendamento nessa hora');
      }

      const appointment = appointmentsRepository.create({
        provider, date: appointmentDate,
      });

      await appointmentsRepository.save(appointment);

      return appointment;
    } catch (err) {
      throw Error(err.message);
    }
  }
}
