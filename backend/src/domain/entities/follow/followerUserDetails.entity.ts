import User from '../user/User';

export default interface FollowerUserDetails {
  _id?: string;
  follower?: string;
  following?: string;
  createdAt?: string;
  updatedAt?: string;
  userDetails?: User;
}
