
import UpdatadeUserAvatarService from '@modules/users/services/UpdatadeUserAvatarService';

import FakeDiskStorageProvider from '@shared/providers/StorageProvider/fakes/FakeDiskStorageProvider';

import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUser';

describe('Update user avatar', () => {
  it('should be able to update user avatar', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeDiskStorageProvider = new FakeDiskStorageProvider();
    const updateUserAvatar = new UpdatadeUserAvatarService(
      fakeUserRepository,
      fakeDiskStorageProvider,
    );

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    const UserWithingNewAvatar = await updateUserAvatar.execute({
      avatarFileName: 'avatar.png',
      user_id: user.id,
    });

    expect(UserWithingNewAvatar.avatar).toBe('avatar.png');
  });

  it('should not be able to update user avatar from non existing user or user_id not exists', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeDiskStorageProvider = new FakeDiskStorageProvider();
    const updateUserAvatar = new UpdatadeUserAvatarService(
      fakeUserRepository,
      fakeDiskStorageProvider,
    );

    await expect(updateUserAvatar.execute({
      avatarFileName: 'avatar.png',
      user_id: 'nonExistsUsers',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old user avatar when updating new user avatar', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeDiskStorageProvider = new FakeDiskStorageProvider();

    const deleteFile = jest.spyOn(fakeDiskStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdatadeUserAvatarService(
      fakeUserRepository,
      fakeDiskStorageProvider,
    );

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    await updateUserAvatar.execute({
      avatarFileName: 'avatar.png',
      user_id: user.id,
    });


    const UserWithingNewAvatar = await updateUserAvatar.execute({
      avatarFileName: 'avatar2.png',
      user_id: user.id,
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.png');

    expect(UserWithingNewAvatar.avatar).toBe('avatar2.png');
  });
})
