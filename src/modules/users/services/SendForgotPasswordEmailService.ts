/* eslint-disable class-methods-use-this */
import 'reflect-metadata';


import { injectable, inject } from 'tsyringe';
import UserRepository from '@modules/users/repositories/IUsersRepository';


@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
      @inject('UsersRepository')
      private userRepository: UserRepository,
  ) {}

  public async execute({ email }: {email: string}): Promise<void> {
    console.log(email);
  }
}
