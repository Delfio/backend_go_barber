import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';


describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '15155151515',
    })

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('15155151515');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 6, 26, 13);

    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '15155151515',
    })

    await expect(createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '15155151515',
    })).rejects.toBeInstanceOf(AppError)
  })
})
