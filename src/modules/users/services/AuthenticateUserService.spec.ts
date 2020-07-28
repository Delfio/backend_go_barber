import FakeUserRepository from '@modules/users/repositories/fakes/FakeUser';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';

import AppError from '@shared/errors/AppError';

// Necessário criar um usuario para poder autenticar o mesmo;
describe('AuthenticateUser', () => {
  it('should be able to authenticate user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const authenticate = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

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
})
