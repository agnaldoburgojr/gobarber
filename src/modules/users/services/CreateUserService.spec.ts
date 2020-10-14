import FakeAppointmentsRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeAppointmentsRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createAppointment = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createAppointment.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same from another', async () => {
    const fakeUsersRepository = new FakeAppointmentsRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createAppointment = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createAppointment.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(
      createAppointment.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
