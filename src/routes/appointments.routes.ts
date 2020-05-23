import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Iappointment from '../models/Appointments';

const appointmentsRouter = Router();

const appointments: Iappointment[] = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parseDate = startOfHour(parseISO(date));
  const findAppointmentInSameDate = appointments.find(
    (appointment) => isEqual(parseDate, appointment.date),
  );
  if (findAppointmentInSameDate) {
    return response.status(400).json({
      error: 'Já existe uma agenda nessa data',
    });
  }

  const appointment = new Iappointment(provider, parseDate);


  appointments.push(appointment);
  return response.json(appointment);
});

export default appointmentsRouter;
