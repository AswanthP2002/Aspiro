import { FindUsersQuery } from '../../application/queries/users.query';
import UserProfileAggregatedAdmin from '../entities/userProfileAggregated';
import User from '../entities/user/User.FIX';
import IBaseRepo from './IBaseRepo';
import LoadUsersForPublicDBQuery from '../../application/queries/loadUsersForPublicDB.query';
import UserProfileAggregated from '../entities/userProfileAggregated';
import UserCachedData from '../entities/user/user.cachedData.entity';
import MyProfileAggregated from '../entities/user/myProfileAggregated.entity';

export default interface IUserRepository extends IBaseRepo<User> {
  findByUserId(userId: string): Promise<MyProfileAggregated | null>;
  findByEmail(email?: string): Promise<User | null>;
  findByPhone(phone?: string): Promise<User | null>;
  updateVerify(id?: string): Promise<User | null>;
  isUserBlocked(id?: string): Promise<boolean | null>;
  blockUser(userId: string): Promise<boolean>;
  unblockUser(userId: string): Promise<boolean>;
  findUsersWithQuery(query: FindUsersQuery): Promise<{ users: User[]; total: number } | null>;
  getUserAggregatedProfile(userId: string): Promise<UserProfileAggregatedAdmin | null>;
  addSocialLink(userId: string, socialLink: { domain: string; url: string }): Promise<User | null>;
  removeSocialLink(userId: string, domain: string): Promise<User | null>;
  loadUsersForPublic(
    query: LoadUsersForPublicDBQuery
  ): Promise<{ users: UserProfileAggregated[]; totalPages: number; page: number } | null>;
  addToConnection(userId: string, newConnection: string): Promise<User | null>;
  removeFromConnection(userId: string, removingConnection: string): Promise<User | null>;
  getUserMetaData(userId: string): Promise<UserCachedData | null>;
  addToHiddenPost(userId: string, postId: string): Promise<User | null>;
  removeFromHiddenPost(userId: string, postId: string): Promise<User | null>;
}
