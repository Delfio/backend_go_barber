import { Router } from 'express';
import multer from 'multer';
import CreatedUserService from '@modules/users/services/CreateUserService';
import ensurdAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';

import uploadConfig from '@config/upload';
import UpdatadeUserAvatarService from '@modules/users/services/UpdatadeUserAvatarService';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const userRepository = new UserRepository();

  const createdUser = new CreatedUserService(userRepository);

  const user = await createdUser.execute({ name, email, password });

  delete user.password;

  return response.json(user);
});

usersRouter.patch('/avatar', ensurdAuthenticated, upload.single('avatar'), async (req, res) => {
  const userRepository = new UserRepository();

  const avatarService = new UpdatadeUserAvatarService(userRepository);

  const user = await avatarService.execute({
    user_id: req.user.id,
    avatar_filename: req.file.filename,
  });

  delete user.password;

  return res.json(user);
});

export default usersRouter;
