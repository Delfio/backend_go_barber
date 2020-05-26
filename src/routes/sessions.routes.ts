import { Router } from 'express';
import SessionService from '../service/AuthenticateUserService';

const sesionRoutes = Router();

sesionRoutes.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const authenticateUser = new SessionService();

    const { User, token } = await authenticateUser.execute({
      email, password,
    });

    delete User?.password;

    return res.json({ User, token });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

sesionRoutes.get('/', async (req, res) => {
  try {
    return res.json({ ok: true });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default sesionRoutes;
