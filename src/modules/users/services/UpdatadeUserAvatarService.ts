/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */

import path from 'path';
import fs from 'fs';
import User from '@modules/users/infra/typeorm/entities/User';
import MulterConfig from '@config/upload';
import AppErrors from '@shared/errors/AppError';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';

interface IRequestDTO {
  user_id: string;
  avatarFileName: string;
 }

@injectable()
export default class UpdatadeUserAvatarService {
  constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFileName }: IRequestDTO): Promise<User> {
    const userExists = await await this.userRepository.findByID(user_id);

    if (!userExists) {
      throw new AppErrors('Usúario Inválido', 401);
    }

    if (userExists.avatar) {
      // Deletar avatar anterior
      await this.storageProvider.deleteFile(userExists.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName);

    userExists.avatar = fileName;

    await this.userRepository.updateUser(userExists);

    return userExists;
  }
}
