import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';
import { getHours } from 'date-fns';
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
      month,
      provider_id,
      year,
    });

    const hourStart = 8;
    const eachHourArray = Array.from({
      length: 10,
    },
    (_, index) => index + hourStart);

    const availability = eachHourArray.map((hour) => {
      const hasAppointmentHour = appointments.find(
        (appointment) => getHours(appointment.date) === hour,
      )
      return {
        hour,
        available: !hasAppointmentHour,
      }
    })

    return availability;
  }
}
export default ListProviderDayAvailability
