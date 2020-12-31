import { container } from 'tsyringe';

import ICacheProvider from './models/ICacheProvider';
import RedisProvider from './implementations/RedisCacheProvider';

const providers = {
  redis: RedisProvider,
}

container.registerSingleton<ICacheProvider>(
  'CacheProvider',
  providers.redis,
);
