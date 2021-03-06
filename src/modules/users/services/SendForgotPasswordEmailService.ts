import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';
import UserRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IUserTokenRepository from '@modules/users/repositories/IUserTokensRepository';
import path from 'path'

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
      @inject('UsersRepository')
      private userRepository: UserRepository,

      @inject('MailProvider')
      private mailProvider: IMailProvider,

      @inject('UserTokensRepository')
      private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: {email: string}): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const userToken = await this.userTokenRepository.generate(user.id);
    await this.mailProvider.sendMail({
      to: {
        email: user.email,
        name: user.name,
      },
      subject: '[Gobarber] ~ Recuperação de senha',
      templateData: {
        file: path.resolve(__dirname, '..', 'views', 'Forgot_password.hbs'),
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset-password?tks=${userToken.token}`,
        },
      },
    })
  }
}
