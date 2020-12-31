import Redis from 'ioredis';
import CacheConfig from '@config/cache';
import ICacheProvider from '../models/ICacheProvider';

class RedisCacheProvider implements ICacheProvider {
  private redis: Redis.Redis;

  constructor() {
    this.redis = new Redis(CacheConfig.config.redis);
  }

  async save(key: string, value: string): Promise<void> {
    await this.redis.set(key, value);
  }

  async invalidade(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async recover<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);

    if (!data) {
      return null
    }
    const parsedData = JSON.parse(data);

    return parsedData as T
  }

  async invalidadePrefix(prefix: string): Promise<void> {
    const keys = await this.redis.keys(`${prefix}:*`);

    const pipeline = this.redis.pipeline();

    keys.forEach((key) => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}

export default RedisCacheProvider;
