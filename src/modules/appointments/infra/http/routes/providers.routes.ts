import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import { Router } from 'express';
import ProviderController from '../controllers/ProviderController';

const providerRouter = Router();
const providerController = new ProviderController();

providerRouter.use(ensureAuthenticated);

providerRouter.get('/', providerController.index)

export default providerRouter;
