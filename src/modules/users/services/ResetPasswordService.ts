import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';
import UserRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokenRepository from '@modules/users/repositories/IUserTokensRepository';
import AppError from '@shared/errors/AppError';

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
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);


    if (!userToken) {
      throw new AppError('User not found!')
    }

    const user = await this.userRepository.findByID(userToken.user_id);


    if (!user) {
      throw new AppError('User does not exists!');
    }

    user.password = password;

    await this.userRepository.updateUser(user);
  }
}
export default ResetPasswordService
