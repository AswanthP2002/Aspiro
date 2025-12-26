import { RedisClientType, createClient } from 'redis';
import logger from '../../../logger';

export const redisClient: RedisClientType = createClient({
  // Providing a default URL is good practice for local development.
  // Ensure your .env file has REDIS_URL="redis://127.0.0.1:6379"
  url: process.env.REDIS_URL,
});

export default async function connectRedis() {
  try {
    redisClient.on('error', (err) => {
      logger.error(err, 'Redis Client Error');
    });

    await redisClient.connect();
    logger.info('Redis connected');
  } catch (error: unknown) {
    logger.error(error, 'Error occured while connecting to redis');
    // If Redis is critical, it's better to fail fast and exit the application.
    // This prevents the server from running in a state where essential services (like OTP limiting) will fail.
    logger.fatal('Could not connect to Redis. Shutting down.');
    process.exit(1);
  }
}
