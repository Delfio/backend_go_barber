import User from '@modules/users/entities/IUserEntity';

export default interface IAppointmentEntity{
  id: string;
  provider_id: string;
  provider: User;
  date: Date;
  created_at: Date;
  updated_at: Date;
}
