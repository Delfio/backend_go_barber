import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ProfileController from '../controllers/ProfileController';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const profileRoutes = Router();
const profileController = new ProfileController();

profileRoutes.get('/', ensureAuthenticated, profileController.show)
profileRoutes.put(
  '/update',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
      old_password: Joi.string()
        .when('password', {
          is: Joi.required(),
        }),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.required(),
        }),
    },
  }),
  profileController.create,
)

export default profileRoutes;
