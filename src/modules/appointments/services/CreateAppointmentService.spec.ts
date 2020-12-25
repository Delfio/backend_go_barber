import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';


let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    )
  });
  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '15155151515',
      user_id: 'd5f4d5f4-5d4f5d45f4df54-d54f5df4d4f54',
    })

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('15155151515');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 6, 26, 13);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '15155151515',
      user_id: 'd5f4d5f4-5d4f5d45f4df54-d54f5df4d4f54',

    })

    await expect(createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '15155151515',
      user_id: 'd5f4d5f4-5d4f5d45f4df54-d54f5df4d4f54',

    })).rejects.toBeInstanceOf(AppError)
  })
})
