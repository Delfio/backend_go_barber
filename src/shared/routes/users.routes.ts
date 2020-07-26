import { Router } from 'express';
import multer from 'multer';
import CreatedUserService from '../service/CreateUserService';
import ensurdAuthenticated from '../middleware/ensureAuthenticated';

import uploadConfig from '../../config/upload';
import UpdatadeUserAvatarService from '../service/UpdatadeUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createdUser = new CreatedUserService();

  const user = await createdUser.execute({ name, email, password });

  delete user.password;

  return response.json(user);
});

usersRouter.patch('/avatar', ensurdAuthenticated, upload.single('avatar'), async (req, res) => {
  const avatarService = new UpdatadeUserAvatarService();

  const user = await avatarService.execute({
    user_id: req.user.id,
    avatar_filename: req.file.filename,
  });

  delete user.password;

  return res.json(user);
});

export default usersRouter;
