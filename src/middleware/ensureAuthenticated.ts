/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AuthConfig from '../config/Auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // Validação do token jwt
  const authHeader = request.headers.authorization;

  console.log(authHeader);

  if (!authHeader) {
    throw new Error('JWT inexistente!');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, AuthConfig.jwt.secret);
    const { sub } = decoded as TokenPayload; // Forçar um tipo de uma váriavel

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new Error('JWT Inválido');
  }
}
