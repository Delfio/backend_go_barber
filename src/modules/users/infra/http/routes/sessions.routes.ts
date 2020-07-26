import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const sesionRoutes = Router();
const sessionsControllers = new SessionsController();

sesionRoutes.post('/', sessionsControllers.create);

// sesionRoutes.get('/', async (req, res) => res.json({ ok: true }));

export default sesionRoutes;
