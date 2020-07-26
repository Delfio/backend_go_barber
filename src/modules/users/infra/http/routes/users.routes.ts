import { Router } from 'express';
import multer from 'multer';
import ensurdAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';

import uploadConfig from '@config/upload';

import UsersControllers from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';


const usersRouter = Router();
const upload = multer(uploadConfig);
const userAvatarController = new UserAvatarController();

const usersController = new UsersControllers();

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensurdAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
