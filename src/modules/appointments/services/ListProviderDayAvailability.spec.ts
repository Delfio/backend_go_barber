import ListProviderDayAvailability from './ListProviderDayAvailability';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';

let listProviderDayAvailability: ListProviderDayAvailability;
let fakeAppointmentRepository: FakeAppointmentRepository;

describe('List Provider Day Availability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderDayAvailability = new ListProviderDayAvailability(
      fakeAppointmentRepository,
    );
  })
  it('should be able to list the Day availability from provider', async () => {
    const providerId = '213456-454545-58885';


    (async (): Promise<void> => {
      const eachOfHours = [
        15, 16,
      ];

      const app = eachOfHours.map((hour) => fakeAppointmentRepository.create({
        provider_id: providerId,
        date: new Date(2020, 4, 20, hour),
        user_id: 'd5f4d5f4-5d4f5d45f4df54-d54f5df4d4f54',

      }))

      await app;

      jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 4, 20, 11).getTime())

      await fakeAppointmentRepository.create({
        provider_id: providerId,
        date: new Date(2020, 4, 21, 8),
        user_id: 'd5f4d5f4-5d4f5d45f4df54-d54f5df4d4f54',

      })
    })();

    const availability = await listProviderDayAvailability.execute({
      provider_id: providerId,
      month: 5,
      year: 2020,
      day: 20,
    });

    expect(availability).toEqual(expect.arrayContaining([
      { hour: 8, available: false },
      { hour: 9, available: false },
      { hour: 10, available: false },
      { hour: 11, available: false },
      { hour: 12, available: true },
      { hour: 13, available: true },
      { hour: 15, available: false },
      { hour: 16, available: false },
      { hour: 17, available: true },
      { hour: 14, available: true },
    ]));
  });
})
