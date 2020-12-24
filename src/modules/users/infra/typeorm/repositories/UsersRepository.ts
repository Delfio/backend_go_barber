import { getRepository, Repository, Not } from 'typeorm';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'


class UsersRepositorys
implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: {
        email,
      },
    })
  }

  public async findByID(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async updateUser(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  // public async findByDate(date: Date): Promise<User | undefined> {
  //   const appointmentExists = await this.ormRepository.findOne({
  //     where: { date },
  //   });


  //   return appointmentExists;
  // }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const appointments = this.ormRepository.create(userData);

    await this.ormRepository.save(appointments);

    return appointments;
  }

  async returnAllProviders(
    { except_user_id }: {except_user_id?: string},
  ): Promise<User[] | undefined> {
    if (except_user_id) {
      return this.ormRepository.find({
        where: {
          id: Not(except_user_id),
        },
      })
    }

    return this.ormRepository.find();
  }
}

export default UsersRepositorys;
