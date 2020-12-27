import { Router } from 'express';
import multer from 'multer';
import ensurdAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import { celebrate, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

import UsersControllers from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const { multer: MulterConfig } = uploadConfig.config;

const usersRouter = Router();
const upload = multer(MulterConfig);

const userAvatarController = new UserAvatarController();

const usersController = new UsersControllers();

usersRouter.post(
  '/',
  celebrate({
    body: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  ensurdAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
