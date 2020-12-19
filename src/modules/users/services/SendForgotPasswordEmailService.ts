import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';
import UserRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IUserTokenRepository from '@modules/users/repositories/IUserTokensRepository';

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
      @inject('UsersRepository')
      private userRepository: UserRepository,

      @inject('MailProvider')
      private mailProvider: IMailProvider,

      private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: {email: string}): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');
    }

    await this.userTokenRepository.generate(user.id);
    this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido')
  }
}
