import IUserEntity from '../entities/IUserEntity';

export interface IRequestForAuthenticateDTO{
  email: string; password: string;
}
export interface IReturnUserVerifyDTO{
  User: IUserEntity | undefined;
  token: string;
}
