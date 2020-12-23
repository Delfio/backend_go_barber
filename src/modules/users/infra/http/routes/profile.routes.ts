import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const profileRoutes = Router();
const profileController = new ProfileController();

profileRoutes.get('/', ensureAuthenticated, profileController.show)
profileRoutes.put('/update', ensureAuthenticated, profileController.create)

export default profileRoutes;
