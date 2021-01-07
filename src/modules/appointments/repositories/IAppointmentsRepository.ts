import Appointment from '@modules/appointments/entities/IAppointmentEntity';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'

import {
  IFindAllInMonthFromProviderRequest,
  IFindAllAvailableTimesForAProviderInAMonth,
} from '../dtos';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(data: IFindAllInMonthFromProviderRequest): Promise<Appointment[]>;
  findAllInDayFromProvider(
      data: IFindAllAvailableTimesForAProviderInAMonth
    ): Promise<Appointment[]>;
}
