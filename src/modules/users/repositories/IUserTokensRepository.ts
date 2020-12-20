import IUserTokenEntity from '../entities/IUserTokenEntity';

export default interface IUserTokenRepository {
    generate(user_id: string): Promise<IUserTokenEntity>;
    findByToken(user_token: string): Promise<IUserTokenEntity | undefined>;
}
