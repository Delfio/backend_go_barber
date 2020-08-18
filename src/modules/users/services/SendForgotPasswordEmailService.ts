/* eslint-disable class-methods-use-this */
import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';
import UserRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider';

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
      @inject('UsersRepository')
      private userRepository: UserRepository,

      @inject('MailProvider')
      private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: {email: string}): Promise<void> {
    this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido')
  }
}
