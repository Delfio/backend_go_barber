
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUser';
import FakeCacheProvider from '@shared/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeHashProvider: FakeHashProvider;
let fakeUserRepository: FakeUserRepository;
let createUser: CreateUserService;
let fkeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUserRepository = new FakeUserRepository();
    fkeCacheProvider = new FakeCacheProvider();
    createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fkeCacheProvider,
    );
  })
  it('should be able to create a  new user', async () => {
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
