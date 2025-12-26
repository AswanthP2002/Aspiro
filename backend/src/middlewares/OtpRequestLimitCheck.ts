import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from '../presentation/statusCodes';
import { redisClient } from '../infrastructure/redis/redisClient';
import logger from '../../logger';

export default async function allowResendOtp(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { email, id } = req.body;

  if (!email || !id) {
    res.status(StatusCodes.FORBIDEN).json({
      success: false,
      message: 'Invalid request',
    });
  }

  try {
    const key = `otp-limit-${email}-${id}`;

    //get the key
    const limit = await redisClient.get(key);

    //check if it first time
    if (!limit) {
      const multi = redisClient.multi();

      multi.set(key, 1);
      multi.expire(key, 600);

      await multi.exec();

      next();
    }

    //check limit excede
    if (limit && parseInt(limit) < 3) {
      await redisClient.incr(key);
      next();
    } else {
      res.status(StatusCodes.TOO_MANY_REQUESTS).json({
        success: false,
        message: 'Too many requests',
      });
    }
  } catch (error: unknown) {
    logger.error(error, error instanceof Error ? error.message : 'Something went wrong redis');
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Something went wrong',
    });
  }
}
