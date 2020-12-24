import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

class UsersRepositorys
implements IUsersRepository {
  private users: User[] = [];

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  public async findByID(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  public async updateUser(user: User): Promise<User> {
    const userIndex = this.users.findIndex((findUser) => findUser.id === user.id);

    this.users[userIndex] = user;

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async returnAllProviders(
    { except_user_id }: {except_user_id?: string},
  ): Promise<User[] | undefined> {
    return this.users.filter((usrs) => usrs.id !== except_user_id);
  }
}

export default UsersRepositorys;
