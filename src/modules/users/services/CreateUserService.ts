/* eslint-disable class-methods-use-this */
import 'reflect-metadata';


import AppErrors from '@shared/errors/AppError';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { injectable, inject } from 'tsyringe';
import UserRepository from '@modules/users/repositories/IUsersRepository';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';
import IUserEntity from '../entities/IUserEntity';

@injectable()
export default class CreateUserService {
  constructor(
      @inject('UsersRepository')
      private userRepository: UserRepository,
      @inject('HashProvider')
      private hashProvider: IHashProvider,
      @inject('CacheProvider')
      private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ email, name, password }: ICreateUserDTO): Promise<IUserEntity> {
    const emailExists = await this.userRepository.findByEmail(email);

    if (emailExists) {
      throw new AppErrors('E-mail já em uso');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.cacheProvider
      .invalidadePrefix('providers-list');

    return user;
  }
}
