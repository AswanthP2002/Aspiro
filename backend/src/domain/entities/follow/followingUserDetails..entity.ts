import User from '../user/User';

export default interface FollowingUserDetails {
  _id?: string;
  follower?: string;
  following?: string;
  createdAt?: string;
  updatedAt?: string;
  userDetails?: User;
}
