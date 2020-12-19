
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUser';

describe('CreateUser', () => {
  it('should be able to create a  new user', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const fakeUserRepository = new FakeUserRepository();
    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);

    const user = await createUser.execute({
      email: 'delfio_teste@gmail.com',
      name: 'Delfio Francisco',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Delfio Francisco');
    expect(user.email).toBe('delfio_teste@gmail.com');
  });

  it('should be not create a new user with same email', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const fakeUserRepository = new FakeUserRepository();
    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);

    const user = await createUser.execute({
      email: 'delfio_teste@gmail.com',
      name: 'Delfio Francisco',
      password: '123456',
    });
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Delfio Francisco');

    await expect(createUser.execute({
      email: 'delfio_teste@gmail.com',
      name: 'Delfio Francisco',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError)
  })
})
