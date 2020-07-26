/* eslint-disable class-methods-use-this */
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/Auth';
import AppErrors from '@shared/errors/AppError';

import { IRequestForAuthenticateDTO, IReturnUserVerifyDTO } from '@modules/users/dtos/IAuthenticateUserDTO';
import IUserRepository from '@modules/users/repositories/IUsersRepository';


export default class AuthenticateUserService {
  constructor(private userRepository: IUserRepository) {}

  public async execute(
    { email, password }: IRequestForAuthenticateDTO,
  ): Promise<IReturnUserVerifyDTO> {
    const userExists = await this.userRepository.findByEmail(email);

    // Validações
    const error = () => {
      throw new AppErrors('Dados para login inválidos', 401);
    };
    if (!userExists) {
      error();
    }
    const passwordMatch = await compare(password, userExists!.password);

    if (!passwordMatch) {
      error();
    }

    const token = sign({ }, authConfig.jwt.secret, {
      subject: userExists?.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { User: userExists, token };
  }
}
