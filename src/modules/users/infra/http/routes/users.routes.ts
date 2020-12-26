import { Router } from 'express';
import multer from 'multer';
import ensurdAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

import UsersControllers from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';


const usersRouter = Router();
const upload = multer(uploadConfig);
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
