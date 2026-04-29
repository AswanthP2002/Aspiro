import { FindUsersQuery } from '../../application/queries/user/users.query';
import UserProfileAggregatedAdmin from '../entities/user/userProfileAggregated';
import User, { AccountAction } from '../entities/user/User.FIX';
import IBaseRepo from './IBaseRepo';
import LoadUsersForPublicDBQuery from '../../application/queries/user/loadUsersForPublicDB.query';
import UserProfileAggregated from '../entities/user/userProfileAggregated';
import UserCachedData from '../entities/user/user.cachedData.entity';
import MyProfileAggregated from '../entities/user/myProfileAggregated.entity';
import UserFullProfileData from '../entities/user/userFullProfile.entity';
import { ConnectionWithSenderDetails } from '../entities/connection/connectionRequest.entity';

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
  updateAccountAction(userId: string, action: AccountAction): Promise<User | null>;
  getSimilarUsersWithSkills(
    skills: string[],
    userId: string,
    similarEducations: string[],
    similarStudiedInstitutions: string[],
    similarJobRoleWorked: string[],
    similarCompanyWorked: string[],
    similarHeadline: string[],
    similarCity: string[],
    similarDistrict: string[],
    similarState: string[],
    similarCountry: string[],
    similarPincode: string[]
  ): Promise<User[] | null>;
  getUserFullProfileDataAggregated(userId: string): Promise<UserFullProfileData | null>;
  updateProfileView(
    viewerId: string,
    profileId: string
  ): Promise<{ _id: string; views: string[] } | null>;
  getConnections(
    userId: string,
    page: number,
    limit: number,
    search: string
  ): Promise<ConnectionWithSenderDetails[] | null>;
}
