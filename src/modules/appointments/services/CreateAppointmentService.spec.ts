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
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 4, 10, 12).getTime())

    const appointment = await createAppointmentService.execute({
      date: new Date(2020, 4, 10, 12),
      provider_id: '15155151515',
      user_id: 'd5f4d5f4-5d4f5d45f4df54-d54f5df4d4f54',
    })

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('15155151515');
  });

  it('should not be able to create two appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 6, 22, 12).getTime())
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
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 4, 10, 12).getTime())

    await expect(createAppointmentService.execute({
      date: new Date(2020, 4, 10, 11),
      provider_id: '15155151515',
      user_id: 'd5f4d5f4-5d4f5d45f4df54-d54f5df4d4f54',

    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 4, 10, 12).getTime())

    await expect(createAppointmentService.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: '15155151515',
      user_id: '15155151515',

    })).rejects.toBeInstanceOf(AppError)
  });

  it('it not be able to create appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 4, 10).getTime())

    await expect(createAppointmentService.execute({
      date: new Date(2020, 4, 11, 5),
      provider_id: 'provider_id',
      user_id: 'user_id',

    })).rejects.toBeInstanceOf(AppError)

    await expect(createAppointmentService.execute({
      date: new Date(2020, 4, 11, 18),
      provider_id: 'provider_id',
      user_id: 'user_id',

    })).rejects.toBeInstanceOf(AppError)
  })
})
