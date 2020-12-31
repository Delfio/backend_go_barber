import FakeUserRepository from '@modules/users/repositories/fakes/FakeUser';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import FakeCacheProvider from '@shared/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUserRepository;
let listProvidersService: ListProvidersService;
let fkeCacheProvider: FakeCacheProvider;

describe('Providers', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fkeCacheProvider = new FakeCacheProvider();
    listProvidersService = new ListProvidersService(
      fakeUserRepository,
      fkeCacheProvider,
    );
  })
  it('I hope all providers return to me', () => {
    const usersData: ICreateUserDTO[] = [
      {
        email: 'JoehDoe@gmail.com',
        name: 'Joeh Doe',
        password: '123456',
      },
      {
        email: 'JoehDoe2@gmail.com',
        name: 'Joeh Doe2',
        password: '12345677',
      },
      {
        email: 'delfio@gmail.com',
        name: 'Delfio',
        password: '12555',
      },
    ]

    const promisses = usersData.map((usr) => fakeUserRepository.create(usr))


    Promise.all(promisses).then((usrs) => {
      const profileUser = Promise.resolve(listProvidersService.execute({
        user_id: usrs[usrs.length - 1].id,
      }));

      profileUser
        .then((providers) => {
          expect(providers).toEqual([
            usrs[0],
            usrs[1],
          ])
        })
    }).catch((err) => {
      expect(err).toBeNull();
    })
  });
})
