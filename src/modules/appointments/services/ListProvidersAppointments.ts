import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';
import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';
import IAppointment from '../entities/IAppointmentEntity';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import AppointmentsCacheKey from '../utils/AppointmentsConstants';

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
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {
  }

  public async execute({
    provider_id, month, year, day,
  }: IRequest): Promise<IAppointment[]> {
    const cacheKey = AppointmentsCacheKey({
      day,
      month,
      provider_id,
      year,
    })// `providers-appointments:${provider_id}:${year}:${month}:${day}`;
    const cacheData = await this.cacheProvider
      .recover<IAppointment[]>(cacheKey);

    if (!cacheData) {
      const appointments = await this.appointmentRepository
        .findAllInDayFromProvider({
          day,
          month,
          provider_id,
          year,
        });

      const formatedAppointments = classToClass(appointments);

      await this.cacheProvider.save(
        cacheKey,
        JSON.stringify(formatedAppointments),
      );

      return formatedAppointments;
    }

    return cacheData;
  }
}
export default ListProvidersAppointmentsService
