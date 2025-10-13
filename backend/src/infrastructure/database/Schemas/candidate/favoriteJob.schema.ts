import { Schema } from 'mongoose';
import FavoriteJobs from '../../../../domain/entities/candidate/favoriteJobs.entity';

export const FavoriteJobSchema = new Schema<FavoriteJobs>(
  {
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: 'candidates',
      required: true,
    },
    jobId: { type: Schema.Types.ObjectId, ref: 'jobs', required: true },
  },
  { timestamps: true }
);
