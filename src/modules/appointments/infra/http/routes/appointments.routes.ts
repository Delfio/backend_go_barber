/* eslint-disable camelcase */
import { Router } from 'express';
import { parseISO } from 'date-fns';

import CreateAppointmentsServices from '@modules/appointments/services/CreateAppointmentService';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepositorys';
import middlewareAuthentications from '@modules/users/infra/http/middleware/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(middlewareAuthentications);

// appointmentsRouter.get('/', async (request, response) => {
//   const resultado = await appointmentsRepository.find();
//   return response.json(resultado);
// });

appointmentsRouter.post('/', async (request, response) => {
  const appointmentsRepository = new AppointmentRepository();

  const { provider_id, date } = request.body;

  const parseDate = parseISO(date);
  const appointmentServices = new CreateAppointmentsServices(appointmentsRepository);

  const appointment = await appointmentServices.execute({
    date: parseDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
