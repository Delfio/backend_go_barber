import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';
import UserRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokenRepository from '@modules/users/repositories/IUserTokensRepository';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import { differenceInHours } from 'date-fns';


interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
      @inject('UsersRepository')
      private userRepository: UserRepository,

      private userTokenRepository: IUserTokenRepository,

      @inject('HashProvider')
      private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User not found!')
    }

    /**
     * @description arriscado brow
     */
    if (differenceInHours(Date.now(), userToken.created_at) > 2) {
      throw new AppError('Token expired')
    }

    const user = await this.userRepository.findByID(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists!');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.userRepository.updateUser(user);
  }
}
export default ResetPasswordService
