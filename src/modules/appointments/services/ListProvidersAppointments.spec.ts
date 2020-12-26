import AppointmentsRepositorys from '../repositories/fakes/FakeAppointmentsRepository';
import ListProvidersAppointmentsService from './ListProvidersAppointments';


let listProvidersAppointmentsService: ListProvidersAppointmentsService;
let appointmentRespository: AppointmentsRepositorys;

describe('List providers appointments', () => {
  beforeEach(() => {
    appointmentRespository = new AppointmentsRepositorys();
    listProvidersAppointmentsService = new ListProvidersAppointmentsService(
      appointmentRespository,
    );
  });


  it('should be able to list the appointments on a specific day', async () => {
    const provider_id = 'provider';
    const user_id = 'user';
    const year = 2020;
    const month = 4;
    const day = 20;

    const appointmentsHours = [13, 14, 15];

    const appointments = appointmentsHours.map(
      (hours) => appointmentRespository.create({
        date: new Date(year, month, day, hours),
        provider_id,
        user_id,
      }),
    );

    Promise.all(appointments).then(
      (scheduledAppointments) => {
        listProvidersAppointmentsService.execute({
          day,
          month,
          provider_id,
          year,
        }).then((appointmentsResolver) => {
          expect(appointmentsResolver).toEqual(scheduledAppointments);
        })
      },
    ).catch((err) => {
      expect(err).toBeNull();
    })
  })
})
