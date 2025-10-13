import Follow from '../entities/follow.entity';
import IBaseRepo from './IBaseRepo';

export default interface IFollowRepo extends IBaseRepo<Follow> {
  follow(follow: Follow): Promise<Follow | null>;
  unfollow(follower: string, following: string): Promise<void>;
  getFollowers(userId: string): Promise<Follow[] | null>;
  getFollowing(userId: string): Promise<Follow[] | null>;
}
