import ICacheProvider from '../models/ICacheProvider';

type ICacheData = {
    [key: string]: string;
}

class FakeCacheProvider implements ICacheProvider {
    private cache: ICacheData = {};

    async save(key: string, value: string): Promise<void> {
      this.cache[key] = value;
    }

    async invalidade(key: string): Promise<void> {
      delete this.cache[key];
    }

    async recover<T>(key: string): Promise<T | null> {
      const data = this.cache[key];

      if (!data) {
        return null
      }

      return (JSON.stringify(data) as unknown) as T;
    }

    async invalidadePrefix(prefix: string): Promise<void> {
      const keys = Object.keys(this.cache).filter((key) => key.startsWith(`${prefix}:`));

      keys.forEach((key) => delete this.cache[key]);
    }
}

export default FakeCacheProvider;
