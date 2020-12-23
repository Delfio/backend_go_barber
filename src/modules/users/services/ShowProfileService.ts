import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';
import UserRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IUserEntity from '../entities/IUserEntity';

interface IRequest {
    user_id: string;
}

@injectable()
class ShowProfileServices {
  constructor(
      @inject('UsersRepository')
      private userRepository: UserRepository,

  ) {}

  public async execute({ user_id }: IRequest): Promise<IUserEntity> {
    const user = await this.userRepository.findByID(user_id);

    if (!user) {
      throw new AppError('User does not exists!');
    }
    return user;
  }
}
export default ShowProfileServices
