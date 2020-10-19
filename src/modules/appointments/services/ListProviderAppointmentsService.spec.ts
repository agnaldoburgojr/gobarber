import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let listProviderAppointments: ListProviderAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the appointments of a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 10, 20, 8, 0, 0),
      provider_id: 'provider_id',
      user_id: '123123',
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 10, 20, 15, 0, 0),
      provider_id: 'provider_id',
      user_id: '123123',
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider_id',
      day: 20,
      year: 2020,
      month: 11,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
