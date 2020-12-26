/* eslint-disable class-methods-use-this */
import { Response, Request } from 'express';
import { container } from 'tsyringe';
import UpdatadeUserAvatarService from '@modules/users/services/UpdatadeUserAvatarService';
import { classToClass } from 'class-transformer';

export default class UserAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const avatarService = container.resolve(UpdatadeUserAvatarService);

    const user = await avatarService.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });


    return response.json({
      user: classToClass(user),

    });
  }
}
