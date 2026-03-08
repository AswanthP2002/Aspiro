export const AdminApiRouts = {
  //auth
  ADMIN_AUTH:{
    LOGIN: '/v1/login'
  },
  //config - work mode
  ADMIN_CONFIG_WORKMODE: {
    ADD: '/v1/workmode',
    LOAD: '/v1/workmodes',
    CHANGE_STATUS_BY_ID: '/v1/workmodes/:id/status',
    EDIT_BY_ID: '/v1/workmodes/:id/edit',
    DELETE_BY_ID: '/v1/workmodes/:id',
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
  },

  //recruiter - maange
  ADMIN_RECRUITER_MANAGE:{
    LOAD_ALL_RECRUITERS: '/v1/recruiters/data',
    LOAD_RECRUITER_DETAILS_BY_ID: '/v1/recruiters/:recruiterId',
    HANDLE_RECRUITER_VERIFICATION: '/v1/recruiter/:recruiterId/verification/action',
    HANDLE_RECRUITER_PERMISSIONS: '/v1/recruiter/:recruiterId/permissions/update',
  },

  //jobs - manage
  ADMIN_JOBS_MANAGE: {
    LOAD_ALL_JOBS: '/v1/jobs/data',
    LOAD_JOB_DETAILS_BY_ID: '/v1/job/details/:jobId',
    DELETE_JOB_BY_JOBID: '/v1/job/:jobId'
  },
} as const;
