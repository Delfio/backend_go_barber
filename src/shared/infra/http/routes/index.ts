import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes';
import UserRotes from '@modules/users/infra/http/routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', UserRotes);


export default routes;
