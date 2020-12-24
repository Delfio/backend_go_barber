import { Router } from 'express';
import AppointmentRoutes from './appointments.routes';
import ProvidersRoutes from './providers.routes';

const indexRoutes = Router();

indexRoutes.use('/', AppointmentRoutes);
indexRoutes.use('/providers', ProvidersRoutes);

export default indexRoutes;
