import { Router } from 'express';
import { parseISO } from 'date-fns';
import CreateAppointmentsServices from '../service/CreateAppointmentService';
import AppointmentRepository from '../repository/AppointmentsRepositorys';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentRepository();

appointmentsRouter.get('/', (request, response) => {
  try {
    return response.json(appointmentsRepository.all());
  } catch (error) {
    return response.json(error.message);
  }
});

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parseDate = parseISO(date);
    const appointmentServices = new CreateAppointmentsServices(appointmentsRepository);

    const appointment = appointmentServices.execute({
      date: parseDate,
      provider,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({
      error: err.message,
    });
  }
});

export default appointmentsRouter;
