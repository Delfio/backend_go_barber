import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ProviderController from '../controllers/ProviderController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providerRouter = Router();

const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerController = new ProviderController();

providerRouter.use(ensureAuthenticated);

providerRouter.get('/', providerController.index);

providerRouter.get(
  '/availability/:provider_id/monthAvailability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerMonthAvailabilityController.index,
);

providerRouter.get(
  '/availability/:provider_id/dayAvailability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerDayAvailabilityController.index,
);


export default providerRouter;
