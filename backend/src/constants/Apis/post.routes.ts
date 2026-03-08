export const PostApiRoutes = {
  UPLOAD_A_POST: '/v1/post',
  DELETE_A_POST_BY_ID: '/v1/post/:postId',
  LIKE_A_POST: '/v1/post/like/:postId',
  UNLIKE_A_POST: '/v1/post/unlike/:postId',
  GET_POSTS: '/v1/posts',
  HIDE_A_POST: '/v1/posts/:postId/hide',
  UNHIDE_A_POST: '/v1/posts/:postId/unhide',
  SAVE_UNSAVE_A_POST: '/v1/posts/:postId/save',
  COMMENT_ON_A_POST: '/v1/post/:postId/comment',
  DELETE_COMMENT_FROM_A_POST: '/v1/post/:postId/comment/:commentId',
  LIKE_A_COMMENT: '/v1/post/comment/:commentId',
  UNLIKE_A_COMMENT: '/v1/post/comment/:commentId/unlike'
} as const;
