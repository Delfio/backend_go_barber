import { IRequestForAuthenticateDTO, IReturnUserVerifyDTO } from '@modules/users/dtos/IAuthenticateUserDTO';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';


import User from '@modules/users/entities/IUserEntity';

export default interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findByID(id: string): Promise<User | undefined>;
  create(user: ICreateUserDTO): Promise<User>;
  updateUser(user: User): Promise<User>;
}
