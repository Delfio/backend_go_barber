/* eslint-disable class-methods-use-this */
import 'reflect-metadata';

import { sign } from 'jsonwebtoken';
import authConfig from '@config/Auth';
import AppErrors from '@shared/errors/AppError';

import { injectable, inject } from 'tsyringe';

import { IRequestForAuthenticateDTO, IReturnUserVerifyDTO } from '@modules/users/dtos/IAuthenticateUserDTO';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';


@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

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
    const passwordMatch = await this.hashProvider.compareHash(
      password,
        userExists!.password,
    );

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
