import { uuid } from 'uuidv4';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'


class AppointmentsRepositorys
implements IAppointmentRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointmentByDate = this.appointments.find(
      (appointment) => appointment.date === date,
    );

    return appointmentByDate;
  }

  public async create({ date, provider_id }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id })

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepositorys;