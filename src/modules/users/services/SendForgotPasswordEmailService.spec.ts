
import SendForgotRepository from '@modules/users/services/SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokenRepository from '@modules/users/repositories/fakes/FakeUserTokenRepository';

import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUser';

let fakeUserRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokenRepository;

let sendForgotPasswordByEmail: SendForgotRepository;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokenRepository();

    sendForgotPasswordByEmail = new SendForgotRepository(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokenRepository,
    );
  })

  it('should be able to recover the password using the e-mail', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'teste@example.com.br',
      password: 'teste123456',
    })


    await sendForgotPasswordByEmail.execute({
      email: 'teste@example.com.br',
    });

    expect(sendMail).toHaveBeenCalled()
  });

  it('should not be able to recolver a non-exxisting user password', async () => {
    await expect(
      sendForgotPasswordByEmail.execute({
        email: 'delfio_teste@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError)
  });

  it('should generate a forgot password token', async () => {
    const generatedToken = jest.spyOn(fakeUserTokenRepository, 'generate');

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'teste@example.com.br',
      password: 'teste123456',
    })
    await sendForgotPasswordByEmail.execute({
      email: 'teste@example.com.br',
    });

    expect(generatedToken).toHaveBeenCalledWith(user.id)
  });
})
