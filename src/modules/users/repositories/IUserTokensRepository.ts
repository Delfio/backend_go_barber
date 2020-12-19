import IUserTokenEntity from '../entities/IUserTokenEntity';

export default interface IUserTokenRepository {
    generate(user_id: string): Promise<IUserTokenEntity>;
}
