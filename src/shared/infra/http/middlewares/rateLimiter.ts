import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { createClient } from 'redis';
import RedisConfig from '@config/cache';
import AppError from '@shared/errors/AppError';

const { redis } = RedisConfig.config;

const redisCliente = createClient({
  port: redis.port,
  host: redis.host,
  password: redis.password,
  enable_offline_queue: false,
});

const maxWrongAttemptyByIPperMinute = 5;
const maxWrongAttemptsByIPperDay = 100;


const rateLimiterFastBruteByIp = new RateLimiterRedis({
  storeClient: redisCliente,
  keyPrefix: 'ratelimit',
  points: maxWrongAttemptyByIPperMinute,
  duration: 30,
  blockDuration: 60 * 10,
});

const rateLimiterSlowBruteByIp = new RateLimiterRedis({
  storeClient: redisCliente,
  keyPrefix: 'ratelimit',
  points: maxWrongAttemptsByIPperDay,
  duration: 60 * 60 * 24,
  blockDuration: 60 * 60 * 24,
});


export default async (req: Request, res: Response, nex: NextFunction): Promise<Response |void> => {
  const { ip } = req;

  const [resFastByIP, resSlowByIP] = await Promise.all([
    rateLimiterFastBruteByIp.get(ip),
    rateLimiterSlowBruteByIp.get(ip),
  ]);

  let retrySeconds = 0;

  if (!!resSlowByIP && resSlowByIP.consumedPoints > maxWrongAttemptsByIPperDay) {
    retrySeconds = Math.round(resSlowByIP.msBeforeNext / 1000) || 1;
  } else if (!!resFastByIP && resFastByIP.consumedPoints > maxWrongAttemptyByIPperMinute) {
    retrySeconds = Math.round(resFastByIP.msBeforeNext / 1000) || 1;
  }

  if (retrySeconds > 0) {
    res.set('Retry-After', String(retrySeconds));
    return res.status(429).json({
      message: 'Too Many Request',
    });
  }
  try {
    rateLimiterFastBruteByIp.consume(ip);
    rateLimiterSlowBruteByIp.consume(ip);
    return nex();
  } catch (err) {
    throw new AppError('Too Super Many Request', 429);
  }

  // await rateLimiter.consume(req.ip);
}
