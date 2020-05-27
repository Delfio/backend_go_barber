/* eslint-disable class-methods-use-this */
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../config/Auth';
import AppErrors from '../errors/AppError';

interface RequestDTO{
  email: string, password: string
}
interface ReturnDTO{
  User: User | undefined,
  token: string
}


export default class AuthenticateUserService {
  public async execute({ email, password }:RequestDTO): Promise<ReturnDTO> {
    const userRepo = getRepository(User);

    const userExists = await userRepo.findOne({
      where: { email },
    });

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
