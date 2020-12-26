import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

type IRequest = {
    provider_id: string;
    day: number;
    month: number;
    year: number;
}

type IResponse = Array<{
    hour: number;
    available: boolean;
}>;

@injectable()
class ListProviderDayAvailability {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentsRepository,
  ) {
  }

  public async execute({
    day,
    month,
    provider_id,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentRepository.findAllInDayFromProvider({
      day,
      month: month - 1,
      provider_id,
      year,
    });

    const hourStart = 8;
    const currentDate = new Date(Date.now());

    const eachHourArray = Array.from({
      length: 10,
    },
    (_, index) => index + hourStart);

    const availability = eachHourArray.map((hour) => {
      const hasAppointmentHour = appointments.find(
        (appointment) => getHours(appointment.date) === hour,
      )

      const compareDate = new Date(year, month - 1, day, hour)

      return {
        hour,
        available: (!hasAppointmentHour && isAfter(compareDate, currentDate)),
      }
    });

    return availability;
  }
}
export default ListProviderDayAvailability
