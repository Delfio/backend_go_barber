import { EntityRepository, Repository } from 'typeorm';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
// Responsável por comunicar com o banco de dados

@EntityRepository(Appointment)
class AppointmentsRepositorys extends Repository<Appointment>
  implements IAppointmentRepository {
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointmentExists = await this.findOne({
      where: { date },
    });


    return appointmentExists;
  }
}

export default AppointmentsRepositorys;
