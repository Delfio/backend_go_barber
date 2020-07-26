import { Router } from 'express';
import SessionService from '@modules/users/services/AuthenticateUserService';

const sesionRoutes = Router();

sesionRoutes.post('/', async (req, res) => {
  const { email, password } = req.body;

  const authenticateUser = new SessionService();

  const { User, token } = await authenticateUser.execute({
    email, password,
  });

  delete User?.password;

  return res.json({ User, token });
});

// sesionRoutes.get('/', async (req, res) => res.json({ ok: true }));

export default sesionRoutes;
