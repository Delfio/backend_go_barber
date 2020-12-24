import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';


import User from '@modules/users/entities/IUserEntity';

export default interface IUserRepository {
  returnAllProviders({ except_user_id }: {except_user_id?: string}): Promise<User[] | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByID(id: string): Promise<User | undefined>;
  create(user: ICreateUserDTO): Promise<User>;
  updateUser(user: User): Promise<User>;
}
