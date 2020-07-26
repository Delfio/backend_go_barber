import User from '@modules/users/infra/typeorm/entities/User';

export interface IRequestForAuthenticateDTO{
  email: string; password: string;
}
export interface IReturnUserVerifyDTO{
  User: User | undefined;
  token: string;
}
