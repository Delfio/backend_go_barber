import ListProviderMonthAvailability from './ListProviderMonthAvailability';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';

let listProviderMonthAvailability: ListProviderMonthAvailability;
let fakeAppointmentRepository: FakeAppointmentRepository;


describe('List Provider Month Availability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailability(
      fakeAppointmentRepository,
    );
  })
  it('should be able to list the month availability from provider', async () => {
    const providerId = '213456-454545-58885';


    (async (): Promise<void> => {
      const eachOfHours = [
        8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
      ];

      const appointments = eachOfHours.map((hour) => fakeAppointmentRepository.create({
        provider_id: providerId,
        date: new Date(2020, 4, 20, hour),
        user_id: 'd5f4d5f4-5d4f5d45f4df54-d54f5df4d4f54',

      }))

      await Promise.all(appointments);

      await fakeAppointmentRepository.create({
        provider_id: providerId,
        date: new Date(2020, 4, 21, 8),
        user_id: 'd5f4d5f4-5d4f5d45f4df54-d54f5df4d4f54',

      })
    })();

    // Mocando new Date();
    jest.useFakeTimers('modern').setSystemTime(
      new Date(2020, 4, 19, 8),
    );

    const availability = await listProviderMonthAvailability.execute({
      provider_id: providerId,
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(expect.arrayContaining([
      { day: 20, available: false },
      { day: 21, available: true },
      { day: 22, available: true },
      { day: 19, available: true },
    ]));
  });
})
