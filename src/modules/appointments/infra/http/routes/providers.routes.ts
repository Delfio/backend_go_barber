import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import { Router } from 'express';
import ProviderController from '../controllers/ProviderController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providerRouter = Router();

const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerController = new ProviderController();

providerRouter.use(ensureAuthenticated);

providerRouter.get('/', providerController.index)
providerRouter.get(
  '/availability/:provider_id/monthAvailability',
  providerMonthAvailabilityController.index,
)
providerRouter.get(
  '/availability/:provider_id/dayAvailability',
  providerDayAvailabilityController.index,
)

export default providerRouter;
