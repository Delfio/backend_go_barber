/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */

import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '@modules/users/infra/typeorm/entities/User';
import MulterConfig from '@config/upload';
import AppErrors from '@shared/errors/AppError';

interface RequestDTO {
  user_id: string
  avatar_filename: string
 }

export default class UpdatadeUserAvatarService {
  public async execute({ user_id, avatar_filename }: RequestDTO): Promise<User> {
    const userRepo = getRepository(User);

    const userExists = await userRepo.findOne(user_id);

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

    await userRepo.save(userExists);

    return userExists;
  }
}
