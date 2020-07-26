import { Router } from 'express';
import SessionService from '@modules/users/services/AuthenticateUserService';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sesionRoutes = Router();

sesionRoutes.post('/', async (req, res) => {
  const { email, password } = req.body;
  const userRepository = new UserRepository();

  const authenticateUser = new SessionService(userRepository);

  const { User, token } = await authenticateUser.execute({
    email, password,
  });

  delete User?.password;

  return res.json({ User, token });
});

// sesionRoutes.get('/', async (req, res) => res.json({ ok: true }));

export default sesionRoutes;
