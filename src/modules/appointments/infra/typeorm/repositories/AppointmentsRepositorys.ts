import { getRepository, Repository } from 'typeorm';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'


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
}

export default AppointmentsRepositorys;
