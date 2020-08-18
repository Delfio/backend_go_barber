
import SendForgotRepository from '@modules/users/services/SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/providers/MailProvider/fakes/FakeMailProvider';

import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUser';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using the e-mail', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');


    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'teste@example.com.br',
      password: 'teste123456',
    })

    const sendForgotPasswordByEmail = new SendForgotRepository(fakeUserRepository);

    await sendForgotPasswordByEmail.execute({
      email: 'delfio_teste@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled()
  });
})
