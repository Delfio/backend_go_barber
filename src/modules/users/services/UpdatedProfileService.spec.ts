import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUser';
import UpdatedProfileService from './UpdatedProfileService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

let fakeUserRepository: FakeUserRepository;
let updatedProfileService: UpdatedProfileService;
let fakeHashProvider: FakeHashProvider;

describe('Update user profile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider()
    updatedProfileService = new UpdatedProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  })
  it('should be able to update user profile', async () => {
    const userData: ICreateUserDTO = {
      email: 'joeDoe@gmail.com',
      name: 'Joe Doe',
      password: '123456',
    }
    const user = await fakeUserRepository.create(userData);

    const updatedUser = await updatedProfileService.execute({
      ...userData,
      user_id: user.id,
      name: 'John Doe',
      old_password: user.password,
    });

    expect(updatedUser.name).toBe('John Doe')
    expect(updatedUser.email).toBe(userData.email)
  });

  it('should be able to change to another user email', async () => {
    const userData: ICreateUserDTO = {
      email: 'joeDoe@gmail.com',
      name: 'Joe Doe',
      password: '123456',
    }
    const userData2: ICreateUserDTO = {
      email: 'joe2Doe@gmail.com',
      name: 'Joe Doe',
      password: '123456',
    }
    const user = await fakeUserRepository.create(userData);
    await fakeUserRepository.create(userData2);


    await expect(updatedProfileService.execute({
      ...userData,
      user_id: user.id,
      name: 'John Doe',
      email: userData2.email,
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to updated the profile from non-existing user', async () => {
    await expect(updatedProfileService.execute({
      user_id: 'sdfasdfas-asdfasdf-asdfasdf',
      email: 'joehdoe@gmail.com',
      name: 'John Doe',
      password: '15478',
    })).rejects.toBeInstanceOf(AppError);
  })

  it('should be able to updated the password', async () => {
    const userData: ICreateUserDTO = {
      email: 'joeDoe@gmail.com',
      name: 'Joe Doe',
      password: '123456',
    }

    const user = await fakeUserRepository.create(userData);

    const updatedUser = await updatedProfileService.execute({
      ...userData,
      user_id: user.id,
      name: 'John Doe',
      password: '15478',
      old_password: '123456',
    })

    expect(updatedUser.password).toBe('15478');
  });

  it('should not be able to updated the password without old password', async () => {
    const userData: ICreateUserDTO = {
      email: 'joeDoe@gmail.com',
      name: 'Joe Doe',
      password: '123456',
    }

    const user = await fakeUserRepository.create(userData);

    await expect(updatedProfileService.execute({
      ...userData,
      user_id: user.id,
      name: 'John Doe',
      password: '15478',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to updated the password with wrong old password', async () => {
    const userData: ICreateUserDTO = {
      email: 'joeDoe@gmail.com',
      name: 'Joe Doe',
      password: '123456',
    }

    const user = await fakeUserRepository.create(userData);

    await expect(updatedProfileService.execute({
      ...userData,
      user_id: user.id,
      name: 'John Doe',
      password: '15478',
      old_password: 'wrong old password!',
    })).rejects.toBeInstanceOf(AppError);
  });
})
