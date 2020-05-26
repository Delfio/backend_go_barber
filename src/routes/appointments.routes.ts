/* eslint-disable camelcase */
import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import CreateAppointmentsServices from '../service/CreateAppointmentService';
import AppointmentRepository from '../repository/AppointmentsRepositorys';
import middlewareAuthentications from '../middleware/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(middlewareAuthentications);

appointmentsRouter.get('/', async (request, response) => {
  try {
    const appointmentsRepository = getCustomRepository(AppointmentRepository);
    const resultado = await appointmentsRepository.find();
    return response.json(resultado);
  } catch (error) {
    return response.json(error.message);
  }
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parseDate = parseISO(date);
    const appointmentServices = new CreateAppointmentsServices();

    const appointment = await appointmentServices.execute({
      date: parseDate,
      provider_id,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({
      error: err.message,
    });
  }
});

export default appointmentsRouter;
