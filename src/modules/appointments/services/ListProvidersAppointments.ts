import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';
import IAppointment from '../entities/IAppointmentEntity';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

type IRequest = {
    provider_id: string;
    month: number;
    year: number;
    day: number;
}


@injectable()
class ListProvidersAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentsRepository,
  ) {
  }

  public async execute({
    provider_id, month, year, day,
  }: IRequest): Promise<IAppointment[]> {
    const appointments = await this.appointmentRepository
      .findAllInDayFromProvider({
        day,
        month,
        provider_id,
        year,
      });

    return appointments;
  }
}
export default ListProvidersAppointmentsService
