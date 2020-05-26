/* eslint-disable class-methods-use-this */
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

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
      throw new Error('Dados para login inválidos');
    };
    if (!userExists) {
      error();
    }
    const passwordMatch = await compare(password, userExists!.password);

    if (!passwordMatch) {
      error();
    }

    const token = sign({ }, 'f6ce5a315bb8f41db943c5f467f242c7', {
      subject: userExists?.id,
      expiresIn: '1d',
    });

    return { User: userExists, token };
  }
}
