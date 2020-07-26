/* eslint-disable class-methods-use-this */
import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/User';
import AppErrors from '@shared/errors/AppError';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import UserRepository from '@modules/users/repositories/IUsersRepository';

export default class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  public async execute({ email, name, password }: ICreateUserDTO): Promise<User> {
    const emailExists = await this.userRepository.findByEmail(email);

    if (emailExists) {
      throw new AppErrors('E-mail já em uso');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });


    return user;
  }
}
