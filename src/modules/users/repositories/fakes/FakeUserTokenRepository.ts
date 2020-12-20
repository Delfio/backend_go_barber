import IUserTokenEntity from '@modules/users/entities/IUserTokenEntity';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import { uuid } from 'uuidv4';
import IUserTokenRepository from '../IUserTokensRepository';


class FakeUserTokenRepository implements IUserTokenRepository {
  private tokens: IUserTokenEntity[] = [];

  async generate(user_id: string): Promise<IUserTokenEntity> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      tiken: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.tokens.push(userToken);

    return userToken;
  }

  async findByToken(user_token: string): Promise<IUserTokenEntity | undefined> {
    return this.tokens.find((tks) => tks.token === user_token);
  }
}

export default FakeUserTokenRepository;
