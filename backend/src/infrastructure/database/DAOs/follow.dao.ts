import { model } from 'mongoose';
import Follow from '../../../domain/entities/follow.entity';
import { FollowSchema } from '../Schemas/follow.schema';

export const FollowDAO = model<Follow>('follow', FollowSchema);
