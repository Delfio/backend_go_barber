/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */

import 'reflect-metadata';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUserEntity from '../entities/IUserEntity';

interface IRequestDTO {
    user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
 }

@injectable()
class UpdatedProfile {
  constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email, name, user_id, old_password, password,
  }: IRequestDTO): Promise<IUserEntity> {
    const userExists = await await this.userRepository.findByID(user_id);

    if (!userExists) {
      throw new AppError('Usúario Inválido', 401);
    }

    if (email !== userExists.email) {
      const userWithUpdatedEmail = await this.userRepository
        .findByEmail(email);

      if (userWithUpdatedEmail && userWithUpdatedEmail?.id !== user_id) {
        throw new AppError('E-mail not available', 404);
      }

      userExists.email = email;
    }


    if (password) {
      if (!old_password) {
        throw new AppError('Need to inform the old password!');
      }

      const checkOldPassword = await this
        .hashProvider
        .compareHash(old_password, userExists.password)

      if (!checkOldPassword) {
        throw new AppError('Old Password thes not match!')
      }

      userExists.password = await this.hashProvider.generateHash(password);
    }

    userExists.name = name;

    return this.userRepository.updateUser(userExists);
  }
}

export default UpdatedProfile;
