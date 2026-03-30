import Follow from '../entities/follow/follow.entity';
import FollowerUserDetails from '../entities/follow/followerUserDetails.entity';
import FollowingUserDetails from '../entities/follow/followingUserDetails..entity';
import IBaseRepo from './IBaseRepo';

export default interface IFollowRepo extends IBaseRepo<Follow> {
  follow(follow: Follow): Promise<Follow | null>;
  unfollow(follower: string, following: string): Promise<void>;
  getFollowers(
    userId: string,
    search: string,
    page: number,
    limit: number
  ): Promise<FollowerUserDetails[] | null>;
  getFollowing(
    userId: string,
    search: string,
    page: number,
    limit: number
  ): Promise<FollowingUserDetails[] | null>;
  removeAFollower(followingId: string, followerId: string): Promise<void>;
}
