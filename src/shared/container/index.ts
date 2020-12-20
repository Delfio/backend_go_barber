import { container } from 'tsyringe';
import '@modules/users/providers';
import '@shared/providers/index';


import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepositorys'

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

// import IMailProvider from '../providers/MailProvider/models/IMailProvider';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<UserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<UserToken>(
  'UserToken',
  UserToken,
);
