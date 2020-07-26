/* eslint-disable camelcase */
import { Router } from 'express';

import middlewareAuthentications from '@modules/users/infra/http/middleware/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController'

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(middlewareAuthentications);

// appointmentsRouter.get('/', async (request, response) => {
//   const resultado = await appointmentsRepository.find();
//   return response.json(resultado);
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
