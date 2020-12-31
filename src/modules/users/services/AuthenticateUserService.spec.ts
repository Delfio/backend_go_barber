
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';

import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUser';
import FakeCacheProvider from '@shared/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUserRepository: FakeUserRepository
let fakeHashProvider: FakeHashProvider

let createUserService: CreateUserService;
let authenticate: AuthenticateUserService;
let fkeCacheProvider: FakeCacheProvider;
// Necessário criar um usuario para poder autenticar o mesmo;
describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeHashProvider = new FakeHashProvider()
    fkeCacheProvider = new FakeCacheProvider();
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fkeCacheProvider,
    );
    authenticate = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  })
  it('should be able to authenticate user', async () => {
    const user = await createUserService.execute({
      email: 'delfio_teste@gmail.com',
      name: 'Delfio Francisco',
      password: '123456',
    });

    const response = await authenticate.execute({
      email: 'delfio_teste@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.User).toEqual(user);
  });

  it('should not be able to authenticate whit non existing user', async () => {
    await expect(authenticate.execute({
      email: 'delfio_teste@gmail.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should  not be able to authenticate whit wrong password', async () => {
    await createUserService.execute({
      email: 'delfio_teste@gmail.com',
      name: 'Delfio Francisco',
      password: '123456',
    });

    await expect(authenticate.execute({
      email: 'delfio_teste@gmail.com',
      password: 'wrong-password',
    })).rejects.toBeInstanceOf(AppError)
  });
})
