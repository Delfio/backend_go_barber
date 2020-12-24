import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';
import UserRepository from '@modules/users/repositories/IUsersRepository';
import IUserEntity from '@modules/users/entities/IUserEntity';

interface IRequest {
    user_id: string;
}

@injectable()
class ListAllProvidersService {
  constructor(
      @inject('UsersRepository')
      private userRepository: UserRepository,

  ) {}

  public async execute({ user_id }: IRequest): Promise<IUserEntity[]> {
    const user = await this.userRepository
      .returnAllProviders({ except_user_id: user_id });

    return user || [];
  }
}
export default ListAllProvidersService
