import { model } from 'mongoose';
import FavoriteJobs from '../../../../domain/entities/candidate/favoriteJobs.entity';
import { FavoriteJobSchema } from '../../Schemas/candidate/favoriteJob.schema';

export const FavoriteJobsDAO = model<FavoriteJobs>(
  'favoritejob',
  FavoriteJobSchema
);
