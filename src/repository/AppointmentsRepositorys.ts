import { isEqual } from 'date-fns';
import Appointment from '../models/Appointments';
// Responsável por comunicar com o banco de dados

export default class AppointmentsRepositorys {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public create(data: {provider: string, date: Date}): Appointment {
    const appointment = new Appointment({ provider: data.provider, date: data.date });
    this.appointments.push(appointment);

    return appointment;
  }

  public findByDate(date: Date): Appointment | null {
    const appointmentExists = this.appointments.find(
      (appointment) => isEqual(date, appointment.date),
    );

    return appointmentExists || null;
  }

  public all(): Appointment[] | null {
    return this.appointments;
  }
}
