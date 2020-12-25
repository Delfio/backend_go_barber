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
        8, 9, 10, 11, 13, 14, 15, 16, 17, 18,
      ];


      const app = eachOfHours.map((hour) => fakeAppointmentRepository.create({
        provider_id: providerId,
        date: new Date(2020, 4, 20, hour),
      }))

      await app;

      await fakeAppointmentRepository.create({
        provider_id: providerId,
        date: new Date(2020, 4, 21, 8),
      })
    })();

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
