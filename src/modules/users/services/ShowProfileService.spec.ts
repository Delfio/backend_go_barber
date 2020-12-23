import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUser';
import ShowProfileService from './ShowProfileService';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

let fakeUserRepository: FakeUserRepository;
let showProfileService: ShowProfileService;


describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    showProfileService = new ShowProfileService(
      fakeUserRepository,
    );
  })
  it('I hope it is possible to return a user profile', async () => {
    const userData: ICreateUserDTO = {
      email: 'delfio_teste@gmail.com',
      name: 'Delfio Francisco',
      password: '123456',
    }

    const user = await fakeUserRepository.create(userData);

    expect(user).toHaveProperty('id');

    const profileUser = await showProfileService.execute({
      user_id: user.id,
    });

    expect(profileUser.email).toBe(user.email);
    expect(profileUser.id).toBe(user.id);
    expect(profileUser.password).toBe(user.password);
  });

  it('should be not show the profile from non-existing user', async () => {
    await expect(showProfileService.execute({
      user_id: 'asdfasdfasdf-sadfasdf-asdfasdf-dfasd11',
    })).rejects.toBeInstanceOf(AppError)
  })
})
