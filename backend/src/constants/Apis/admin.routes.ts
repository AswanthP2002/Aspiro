export const AdminApiRouts = {
  //auth
  ADMIN_AUTH: {
    LOGIN: '/v1/login',
  },
  //config - work mode
  ADMIN_CONFIG_WORKMODE: {
    ADD: '/v2/workmode',
    LOAD: '/v2/workmodes',
    CHANGE_STATUS_BY_ID: '/v2/workmodes/:id/status',
    EDIT_BY_ID: '/v2/workmodes/:id/edit',
    DELETE_BY_ID: '/v2/workmodes/:id',
  },
  ADMIN_CONFIG_JOBLEVEL: {
    ADD: '/v1/joblevel',
    LOAD: '/v1/joblevels',
    EDIT_BY_ID: '/v1/joblevel/:id/update',
    CHANGE_STATU_BY_ID: '/v1/joblevel/:id/status',
    DELETE_BY_ID: '/v1/joblevel/:id',
  },
  ADMIN_CONFIG_JOBTYPE: {
    ADD: '/v1/jobtype',
    LOAD: '/v1/jobtypes',
    CHANGE_STATUS_BY_ID: '/v1/jobtype/:id/status',
    EDIT_BY_ID: '/v1/jobtype/:id/update',
    DELETE_BY_ID: '/v1/jobtype/:id',
  },
  ADMIN_CONFIG_SKILLS: {
    ADD: '/v1/skill',
    LOAD: '/v1/skills',
    EDIT_BY_ID: '/v1/skills/:skillId',
    DELETE_BY_ID: '/v1/skills/:skillId',
  },

  //recruiter application - manage
  ADMIN_RECRUITER_APPLICATION: {
    LOAD_ALL_APPLICATIONS: '/v1/recruiter/applications',
    CHANGE_STATUS_UNDER_REVIEW: '/v1/recruiter/application/:id/status-under-review',
    APPROVE_APPLICATION_BY_ID: '/v1/recruiter/application/approve/:recruiterId',
    REJECT_APPLICATION_BY_ID: '/v1/recruiter/application/:recruiterId',
    LOAD_APPLICATION_DETAILS_BY_ID: '/v1/recruiter/application/:id/details',
  },

  //recruiter - maange
  ADMIN_RECRUITER_MANAGE: {
    LOAD_ALL_RECRUITERS: '/v1/recruiters/data',
    LOAD_RECRUITER_DETAILS_BY_ID: '/v2/recruiters/:recruiterId',
    HANDLE_RECRUITER_VERIFICATION: '/v2/recruiter/:recruiterId/verification/action',
    HANDLE_RECRUITER_PERMISSIONS: '/v2/recruiter/:recruiterId/permissions/update',
    DELETE_RECRUITER: '/v1/recruiter/:recruiterId',
  },

  //jobs - manage
  ADMIN_JOBS_MANAGE: {
    LOAD_ALL_JOBS: '/v1/jobs/data',
    LOAD_JOB_DETAILS_BY_ID: '/v1/job/details/:jobId',
    DELETE_JOB_BY_JOBID: '/v1/job/:jobId',
    FLAG_JOB_BY_JOBID: '/v1/job/:jobId/flag',
    BLOCK_A_JOB: '/v1/job/:jobId/block',
    UNBLOCK_A_JOB: '/v1/job/:jobId/unblock',
  },

  ADMIN_USERS_MANAGE: {
    LOAD_ALL_USERS: '/v1/users',
    SUSPEND_USER_BY_ID: '/v1/user/block/:userId',
    UNSUSPEND_USER_BY_ID: '/v1/user/unblock/:userId',
    BAN_USER_BY_ID: '/v1/user/ban/:userId',
    DELETE_USER_BY_ID: '/v1/user/:userId',
  },
} as const;
