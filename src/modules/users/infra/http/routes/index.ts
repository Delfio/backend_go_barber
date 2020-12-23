import { Router } from 'express';
import passwordRoutes from './password.routes';
import profileRoutes from './profile.routes';
import sesionsRoutes from './sessions.routes';
import usersRoutes from './users.routes';

const routes = Router();

routes.use('/', usersRoutes);
routes.use('/sessions', sesionsRoutes);
routes.use('/password', passwordRoutes)
routes.use('/profile', profileRoutes)

export default routes;
