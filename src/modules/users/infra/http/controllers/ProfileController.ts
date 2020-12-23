import UpdatedProfileService from '@modules/users/services/UpdatedProfileService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowProfileService from '@modules/users/services/ShowProfileService';

class ProfileController {
  public async show(
    req: Request, res: Response,
  ): Promise<Response> {
    const {
      id,
    } = req.user;

    const showProfileService = container.resolve(ShowProfileService);

    const user = await showProfileService.execute({
      user_id: id,
    });

    delete user.password;

    return res.json(user);
  }

  public async create(
    req: Request, res: Response,
  ): Promise<Response> {
    const {
      name,
      email,
      old_password,
      password,
    } = req.body;

    const {
      id,
    } = req.user;

    const updatedProfile = container.resolve(UpdatedProfileService);

    const user = await updatedProfile.execute({
      email,
      name,
      user_id: id,
      old_password,
      password,
    });

    delete user.password;

    return res.json(user);
  }
}

export default ProfileController;
