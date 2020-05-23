import { startOfHour } from 'date-fns';
import Appointment, { Iappointment } from '../models/Appointments';
import AppointmentRepository from '../repository/AppointmentsRepositorys';

export default class CreateAppointmentService {
  private appointmentsRepository: AppointmentRepository;

  constructor(appointmentsRepository: AppointmentRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: Omit<Iappointment, 'id'>): Appointment {
    try {
      const appointmentDate = startOfHour(date);
      const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate);
      if (findAppointmentInSameDate) {
        throw Error('Já existe um agendamento nessa hora');
      }

      const appointment = this.appointmentsRepository.create({
        provider, date: appointmentDate,
      });


      return appointment;
    } catch (err) {
      throw Error(err.message);
    }
  }
}
