/* eslint-disable camelcase */
import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import CreateAppointmentsServices from '@modules/appointments/services/CreateAppointmentService';
import AppointmentRepository from '@modules/appointments/repositories/AppointmentsRepositorys';
import middlewareAuthentications from '@modules/users/infra/http/middleware/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(middlewareAuthentications);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentRepository);
  const resultado = await appointmentsRepository.find();
  return response.json(resultado);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parseDate = parseISO(date);
  const appointmentServices = new CreateAppointmentsServices();

  const appointment = await appointmentServices.execute({
    date: parseDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
