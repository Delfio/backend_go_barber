/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */

import path from 'path';
import fs from 'fs';
import User from '@modules/users/infra/typeorm/entities/User';
import MulterConfig from '@config/upload';
import AppErrors from '@shared/errors/AppError';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';

interface IRequestDTO {
  user_id: string;
  avatar_filename: string;
 }

@injectable()
export default class UpdatadeUserAvatarService {
  constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository,
  ) {}

  public async execute({ user_id, avatar_filename }: IRequestDTO): Promise<User> {
    const userExists = await await this.userRepository.findByID(user_id);

    if (!userExists) {
      throw new AppErrors('Usúario Inválido', 401);
    }

    if (userExists.avatar) {
      // Deletar avatar anterior
      const userAvatarFilePath = path.join(MulterConfig.directory, userExists.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    userExists.avatar = avatar_filename;

    await this.userRepository.updateUser(userExists);

    return userExists;
  }
}
