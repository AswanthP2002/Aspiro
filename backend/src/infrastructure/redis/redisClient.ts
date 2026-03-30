import dotenv from 'dotenv';
import { createClient, RedisClientType } from 'redis';

dotenv.config();

export const redisClient: RedisClientType = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

redisClient.on('error', (error: unknown) =>
  console.log('Redis client error', error instanceof Error ? error.message : error)
);

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Connection established succesfully');
  } catch (error: unknown) {
    console.log('Error occured while connecting redis', error);
  }
};
