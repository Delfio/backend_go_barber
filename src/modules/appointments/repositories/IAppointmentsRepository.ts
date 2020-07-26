import Appointment from '@modules/appointments/entities/IAppointments';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
