/* eslint-disable class-methods-use-this */
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/User';
import AppErrors from '@shared/errors/AppError';

interface Irequest {
  name: string;
  email: string;
  password: string
}

export default class CreateUserService {
  public async execute({ email, name, password }: Irequest): Promise<User> {
    const userRepository = getRepository(User);

    const emailExists = await userRepository.findOne({
      where: { email },
    });

    if (emailExists) {
      throw new AppErrors('E-mail já em uso');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}
