export const UserApiRoutes = {
  //users - job
  USER_JOB_MANAGE: {
    APPLY_BY_JOBID: '/v1/job/:jobId/apply',
    CHECK_APPLIED_BY_JOBID: '/v1/job/:jobId/applied',
    CHECK_SAVED_BY_JOBID: '/v1/job/:jobId/saved/check',
    SAVE_JOB: '/v1/job/:jobId/save',
    UNSAVE_JOB: '/v1/job/:id/unsave',
    LOAD_SAVED_JOBS: '/v1/job/saved',
    LOAD_MY_APPLICATIONS: '/v1/applications'
  },

  USER_AUTH_MANAGE:{
    GOOGLE_LOGIN: '/v1/google/sign-up',
    NORMAL_LOGIN: '/v1/user/login',
  },

  USER_PROFILE_MANAGE:{
    PROFILE_DETAILS:{
      EDIT: '/v1/user/me'
    },
    SOCIAL_LINKS:{
      ADD: '/v1/user/me/social-links',
      REMOVE: '/v1/user/me/social-links/remove',
    },
    PROFILE_PICTURE:{
      UPLOAD: '/v1/user/me/profile-picture',
      REMOVE: '/v1/user/me/profile-picture/remove'
    },
    COVER_PHOTO:{
      UPLOAD: '/v1/user/me/cover-photo',
      REMOVE: '/v1/user/me/cover-photo/remove'
    }
  }
} as const;
