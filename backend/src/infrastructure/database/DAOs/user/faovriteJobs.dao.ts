import { model } from 'mongoose';
import FavoriteJobs from '../../../../domain/entities/user/favoriteJobs.entity';
import { FavoriteJobSchema } from '../../Schemas/user/favoriteJob.schema';

export const FavoriteJobsDAO = model<FavoriteJobs>(
  'favoritejob',
  FavoriteJobSchema
);
