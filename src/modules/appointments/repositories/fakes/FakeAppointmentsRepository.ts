import { uuid } from 'uuidv4';
import {
  isEqual, getMonth, getDate, getYear,
} from 'date-fns';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import {
  ICreateAppointmentDTO,
  IFindAllAvailableTimesForAProviderInAMonth,
  IFindAllInMonthFromProviderRequest,
} from '@modules/appointments/dtos'

class AppointmentsRepositorys
implements IAppointmentRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date, provider_id: string): Promise<Appointment | undefined> {
    const appointmentByDate = this.appointments.find(
      (appointment) => isEqual(appointment.date, date)
      && appointment.provider_id === provider_id,
    );

    return appointmentByDate;
  }

  public async create({ date, provider_id, user_id }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, {
      id: uuid(), date, provider_id, user_id,
    });

    this.appointments.push(appointment);

    return appointment;
  }

  async findAllInMonthFromProvider(
    data: IFindAllInMonthFromProviderRequest,
  ): Promise<Appointment[]> {
    return this.appointments.filter((appointment) => appointment.provider_id === data.provider_id
        && getMonth(appointment.date) + 1 === data.month
        && getYear(appointment.date) === data.year)
  }

  async findAllInDayFromProvider(
    {
      day,
      month,
      provider_id,
      year,
    }: IFindAllAvailableTimesForAProviderInAMonth,
  ): Promise<Appointment[]> {
    return this.appointments.filter((appointment) => (
      appointment.provider_id === provider_id
          && getDate(appointment.date) === day
          && getMonth(appointment.date) + 1 === month
          && getYear(appointment.date) === year
    ));
  }
}

export default AppointmentsRepositorys;
