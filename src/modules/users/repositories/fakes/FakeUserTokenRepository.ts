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
    });

    this.tokens.push(userToken);

    return userToken;
  }
}

export default FakeUserTokenRepository;
