
import FakeUserTokenRepository from '@modules/users/repositories/fakes/FakeUserTokenRepository';

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUser';
import ResetPasswordService from './ResetPasswordService';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;

let resetPasswordService: ResetPasswordService;

describe('Reset Password', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();

    resetPasswordService = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokenRepository,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'teste@example.com.br',
      password: 'teste123456',
    });

    const userToken = await fakeUserTokenRepository.generate(user.id);

    await resetPasswordService.execute({
      password: '123123',
      token: userToken.token,
    });


    const updatedUser = await fakeUserRepository.findByID(user.id);


    expect(updatedUser).not.toBeUndefined();

    expect(updatedUser?.password).toBe('123123')
  });
})
