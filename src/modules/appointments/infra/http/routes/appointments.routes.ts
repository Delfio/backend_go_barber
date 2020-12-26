/* eslint-disable camelcase */
import { Router } from 'express';

import middlewareAuthentications from '@modules/users/infra/http/middleware/ensureAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';
import AppointmentsController from '../controllers/AppointmentsController'
import ProvidersAppointmentsController from '../controllers/ProvidersAppointmentsController'

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providersAppointmentsController = new ProvidersAppointmentsController();

appointmentsRouter.use(middlewareAuthentications);

appointmentsRouter.post('/', celebrate({
  [Segments.BODY]: {
    provider_id: Joi.string().uuid().required(),
    date: Joi.date().required(),
  },
}), appointmentsController.create);

appointmentsRouter.get('/me', providersAppointmentsController.index);

export default appointmentsRouter;
