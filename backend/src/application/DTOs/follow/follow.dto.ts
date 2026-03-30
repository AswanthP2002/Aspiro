export default interface FollowUserDTO {
  follower?: string;
  following?: string;
  acted_by?: string; //name of the acted user
  acted_user_avatar?: string; //profile picture of acted user
}

export interface FollowUserResDTO {
  _id?: string;
  follower?: string;
  following?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UnFollowUserDTO {
  follower: string;
  following: string;
  acted_by?: string;
  acted_user_avatar?: string;
}

export interface FollowersDTO {
  _id?: string;
  follower?: string;
  following?: string;
  createdAt?: string;
  updatedAt?: string;
  userDetails?: {
    _id?: string;
    name?: string;
    headline?: string;
    profilePicture?: string;
  };
}

export interface FollowingsDTO {
  _id?: string;
  follower?: string;
  following?: string;
  createdAt?: string;
  updatedAt?: string;
  userDetails?: {
    _id?: string;
    name?: string;
    headline?: string;
    profilePicture?: string;
  };
}

export interface GetFollowersRequestDTO {
  userId: string;
  search: string;
  page: number;
  limit: number;
}

export interface GetFollowingsRequestDTO {
  userId: string;
  search: string;
  page: number;
  limit: number;
}

export interface RemoveAFollowerDTO {
  followingId: string;
  followerId: string;
}
