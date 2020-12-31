import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';
import UserRepository from '@modules/users/repositories/IUsersRepository';
import IUserEntity from '@modules/users/entities/IUserEntity';
import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
    user_id: string;
}

@injectable()
class ListAllProvidersService {
  constructor(
      @inject('UsersRepository')
      private userRepository: UserRepository,
      @inject('CacheProvider')
      private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<IUserEntity[]> {
    const usersCached = await this.cacheProvider.recover<IUserEntity[]>(`providers-list:${user_id}`);

    if (!usersCached) {
      const user = await this.userRepository
        .returnAllProviders({ except_user_id: user_id });

      await this.cacheProvider.save(
        `providers-list:${user_id}`,
        JSON.stringify(user),
      )

      return user || [];
    }

    return usersCached;
  }
}
export default ListAllProvidersService
