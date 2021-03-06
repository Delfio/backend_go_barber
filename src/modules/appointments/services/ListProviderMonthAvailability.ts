import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';
import {
  getDate, getDaysInMonth, isAfter,
} from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

type IRequest = {
    provider_id: string;
    month: number;
    year: number;
}

type IResponse = Array<{
    day: number;
    available: boolean;
}>;

@injectable()
class ListProviderMonthAvailability {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentsRepository,
  ) {
  }

  public async execute({ provider_id, month, year }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentRepository.findAllInMonthFromProvider({
      provider_id,
      month,
      year,
    });

    const numberOfDaysInMonth = getDaysInMonth(
      new Date(year, month - 1),
    );

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    const availability: IResponse = eachDayArray.map(
      (day) => {
        const compareDate = new Date(year, month - 1, day, 23, 59, 59);
        const appointmentsInDay = appointments
          .filter((appointment) => getDate(appointment.date) === day);

        const afterDate = isAfter(compareDate, new Date());

        return {
          day,
          available: (afterDate && appointmentsInDay.length < 10),
        }
      },
    )

    return availability;
  }
}
export default ListProviderMonthAvailability
