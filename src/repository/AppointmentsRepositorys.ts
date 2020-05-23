import { isEqual } from 'date-fns';
import Appointment from '../models/Appointments';
// Responsável por comunicar com o banco de dados

export default class AppointmentsRepositorys {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public create(provider: string, date: Date): Appointment {
    const appointment = new Appointment(provider, date);
    this.appointments.push(appointment);

    return appointment;
  }

  public findByDate(date: Date): Appointment | null {
    const appointmentExists = this.appointments.find(
      (appointment) => isEqual(date, appointment.date),
    );

    return appointmentExists || null;
  }
}
