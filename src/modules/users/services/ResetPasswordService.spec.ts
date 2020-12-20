
import FakeUserTokenRepository from '@modules/users/repositories/fakes/FakeUserTokenRepository';

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUser';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import ResetPasswordService from './ResetPasswordService';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeHashProvider: FakeHashProvider;

let resetPasswordService: ResetPasswordService;

describe('Reset Password', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokenRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'teste@example.com.br',
      password: 'teste123456',
    });

    const userToken = await fakeUserTokenRepository.generate(user.id);

    const hashIsGenerated = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({
      password: '123123',
      token: userToken.token,
    });


    const updatedUser = await fakeUserRepository.findByID(user.id);


    expect(updatedUser).not.toBeUndefined();
    expect(hashIsGenerated).toHaveBeenCalledWith('123123');
    expect(updatedUser?.password).toBe('123123')
  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(resetPasswordService.execute({
      token: 'non-existing',
      password: '1234',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUserTokenRepository.generate('non-existings')

    await expect(resetPasswordService.execute({
      token,
      password: '1234',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password if passed more than 2 hours', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'teste@example.com.br',
      password: 'teste123456',
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
})
