export const UserApiRoutes = {
  //users - job
  USER_JOB_MANAGE: {
    APPLY_BY_JOBID: '/v1/job/:jobId/apply',
    CHECK_APPLIED_BY_JOBID: '/v1/job/:jobId/applied',
    CHECK_SAVED_BY_JOBID: '/v1/job/:jobId/saved/check',
    SAVE_JOB: '/v1/job/:jobId/save',
    UNSAVE_JOB: '/v1/job/:id/unsave',
    LOAD_SAVED_JOBS: '/v1/job/saved',
    LOAD_MY_APPLICATIONS: '/v1/applications',
    TRACK_MY_APPLICATION: '/v1/application/:applicationId/track',
    GET_MY_INTERVIEWS: '/v1/interviews',
    WITHDRAW_APPLICATION: '/v1/application/:applicationId',
  },

  USER_AUTH_MANAGE: {
    GOOGLE_LOGIN: '/v1/google/sign-up',
    NORMAL_LOGIN: '/v1/user/login',
    VALIDATE_TOKEN: '/v1/token-verify',
  },

  USER_PROFILE_MANAGE: {
    PROFILE_DETAILS: {
      EDIT: '/v1/user/me',
    },
    SOCIAL_LINKS: {
      ADD: '/v1/user/me/social-links',
      REMOVE: '/v1/user/me/social-links/remove',
    },
    PROFILE_PICTURE: {
      UPLOAD: '/v1/user/me/profile-picture',
      REMOVE: '/v1/user/me/profile-picture/remove',
    },
    COVER_PHOTO: {
      UPLOAD: '/v1/user/me/cover-photo',
      REMOVE: '/v1/user/me/cover-photo/remove',
    },
    PROFILE_VIEW_UPDATE: '/v2/user/profile/:id/viewed',
  },

  USER_DOCUMENTS_MANAGE: {
    RESUMES: {
      LOAD: '/v1/user/me/resumes',
      ADD: '/v1/user/me/resume',
      SET_RESUME_AS_PRIMARY: '/v1/user/me/resume/:resumeId/set-primary',
      DELETE: '/v1/user/me/resume/:resumeId',
    },
    CERTIFICATES: {
      LOAD: '/v1/user/me/certificates',
      ADD: '/v1/user/me/certificate/add',
      DELETE: '/v1/user/me/certificate/:certificateId',
    },
  },

  USER_CREDENTIALS_MANAGE: {
    EXPERIENCE: {
      ADD: '/v1/user/me/experience',
      GET: '/v1/user/me/experiences',
      EDIT: '/v1/user/me/experience/:experienceId',
      DELETE: '/v1/user/me/experience/:experienceId',
    },
    EDUCATION: {
      ADD: '/v1/user/me/education',
      GET: '/v1/user/me/educations',
      EDIT: '/v1/user/me/education/:educationId',
      DELETE: '/v1/user/me/education/:educationId',
    },
    SKILLS: {
      ADD: '/v1/user/me/skill',
      GET: '/v1/user/me/skills',
      DELETE: '/v1/user/me/skills/:skillId',
    },
  },

  USER_PUBLIC: {
    LOAD_USERS: '/v1/users',
    LOAD_JOBS: '/v1/jobs',
    LOAD_JOB_DETAILS_BY_ID: '/v1/jobs/details/:jobId',
  },

  USERS: {
    LOAD_ALL_USERS: '/v2/users',
    LOAD_USER_DETAILS_BY_ID: '/v2/users/details/:userId',
    BLOCK_USER_BY_ID: '/v2/user/block/:userId',
    UNBLOCK_USER_BY_ID: '/v2/user/unblock/:userId',
    DELETE_USER_BY_ID: '/v2/user/:userId',
    BAN_USER_BY_ID: '/v2/user/ban/:userId',
    LOAD_USER_FULL_PROFILE_DETAILS: '/v2/user/full-profile/details',
  },

  AI_INTERVIEW: {
    START: '/v2/interview/ai',
    LOAD_DASHBOARD: '/v2/interview/ai/dashboard',
  },
} as const;
