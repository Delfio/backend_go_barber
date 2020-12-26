import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import SessionsController from '../controllers/SessionsController';

const sesionRoutes = Router();
const sessionsControllers = new SessionsController();

sesionRoutes.post('/', celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
}), sessionsControllers.create);

// sesionRoutes.get('/', async (req, res) => res.json({ ok: true }));

export default sesionRoutes;
