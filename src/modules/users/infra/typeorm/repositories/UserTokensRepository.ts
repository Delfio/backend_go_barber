import { getRepository, Repository } from 'typeorm';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUserTokenRepository from '@modules/users/repositories/IUserTokensRepository';
import IUserTokenEntity from '@modules/users/entities/IUserTokenEntity';

class UserTokensRepository
implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  async generate(user_id: string): Promise<IUserTokenEntity> {
    const userToken = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  async findByToken(user_token: string): Promise<IUserTokenEntity | undefined> {
    return this.ormRepository.findOne({
      where: {
        token: user_token,
      },
    })
  }
}

export default UserTokensRepository;
