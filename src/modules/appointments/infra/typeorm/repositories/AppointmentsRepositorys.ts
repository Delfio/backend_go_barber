import { getRepository, Repository, Between } from 'typeorm';
import { startOfMonth, endOfMonth } from 'date-fns';
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

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointmentExists = await this.ormRepository.findOne({
      where: { date },
    });


    return appointmentExists;
  }

  public async create({ date, provider_id }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointments = this.ormRepository.create({
      provider_id,
      date,
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
    const currentDate = new Date(year, month);

    /**
     * Raw(dateFieldName => `to_char(${dateFieldName}, 'MM-YYYY') = '${month}-${yar}'`)
     * // Porem o mês do psql é 01 02 e o nosso é 1 2 3 - necessário fazer parser
     */
    return this.ormRepository.find({
      where: {
        provider_id,
        data: Between(
          startOfMonth(currentDate),
          endOfMonth(currentDate),
        ),
      },
    })
  }

  async findAllInDayFromProvider(
    {
      day,
      month,
      provider_id,
      year,
    }: IFindAllAvailableTimesForAProviderInAMonth,
  ): Promise<Appointment[]> {
    const currentDate = new Date(year, month, day);

    return this.ormRepository.find({
      where: {
        provider_id,
        data: Between(
          startOfMonth(currentDate),
          endOfMonth(currentDate),
        ),
      },
    })
  }
}

export default AppointmentsRepositorys;
