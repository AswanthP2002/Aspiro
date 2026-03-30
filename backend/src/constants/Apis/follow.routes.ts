export const FollowApiRoutes = {
  FOLLOW_A_USER_BY_USER_ID: '/v1/user/follow/:id',
  UNFOLLOW_A_USER_BY_USER_ID: '/v1/user/unfollow/:id',
  GET_FOLLOWERS: '/v2/followers/:userId',
  GET_FOLLOWINGS: '/v2/followings/:userId',
  REMOVE_A_FOLLOWER: '/v2/follower/:followerId/remove',
} as const;
