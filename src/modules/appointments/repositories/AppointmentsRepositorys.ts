import { EntityRepository, Repository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
// Responsável por comunicar com o banco de dados

@EntityRepository(Appointment)
export default class AppointmentsRepositorys extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const appointmentExists = await this.findOne({
      where: { date },
    });


    return appointmentExists || null;
  }
}
