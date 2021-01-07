import { getRepository, Repository, Between } from 'typeorm';
import {
  startOfMonth, endOfMonth, startOfDay, endOfDay,
} from 'date-fns';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import {
  ICreateAppointmentDTO,
  IFindAllAvailableTimesForAProviderInAMonth,
  IFindAllInMonthFromProviderRequest,
} from '@modules/appointments/dtos';

class AppointmentsRepositorys
implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date, provider_id: string): Promise<Appointment | undefined> {
    const appointmentExists = await this.ormRepository.findOne({
      where: { date, provider_id },
    });

    return appointmentExists;
  }

  public async create({ date, provider_id, user_id }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointments = this.ormRepository.create({
      provider_id,
      date,
      user_id,
    });

    await this.ormRepository.save(appointments);

    return appointments;
  }

  async findAllInMonthFromProvider(
    {
      month,
      provider_id,
      year,
    }: IFindAllInMonthFromProviderRequest,
  ): Promise<Appointment[]> {
    const currentDate = new Date(year, month - 1);

    /**
     * Raw(dateFieldName => `to_char(${dateFieldName}, 'MM-YYYY') = '${month}-${yar}'`)
     * // Porem o mês do psql é 01 02 e o nosso é 1 2 3 - necessário fazer parser
     */
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Between(
          startOfMonth(currentDate),
          endOfMonth(currentDate),
        ),
      },
    });

    return appointments;
  }

  async findAllInDayFromProvider(
    {
      day,
      month,
      provider_id,
      year,
    }: IFindAllAvailableTimesForAProviderInAMonth,
  ): Promise<Appointment[]> {
    const currentDate = new Date(year, month - 1, day);

    return this.ormRepository.find({
      where: {
        provider_id,
        date: Between(
          startOfDay(currentDate),
          endOfDay(currentDate),
        ),
      },
      relations: ['user'],
    });
  }
}

export default AppointmentsRepositorys;
