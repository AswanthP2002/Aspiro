export const RecruiterApiRoutes = {
  RECRUITER_PROFILE: {
    CREATE: '/v1/recruiter/create',
    LOAD_MY_RECRUITER_PROFILE: '/v1/recruiter/profile/overview',
  },
  RECRUITER_JOB_CONFIG_LISTS: {
    JOB_LEVEL_LIST_FETCH: '/v1/recruiter/joblevels',
    JOB_TYPE_LIST_FETCH: '/v1/recruiter/jobtypes',
    WORK_MODE_LIST_FETCH: '/v1/recruiter/workmodes',
  },
  RECRUITER_JOB_MANAGE: {
    POST_A_JOB: '/recruiter/job/create',
    LOAD_MY_JOBS: '/recruiter/jobs',
    LOAD_SINGLE_JOB_DETAILS_BY_ID: '/v1/recruiter/jobs/:jobId/details',
    EDIT_A_JOB: '/recruiter/job/edit',
    DELETE_A_JOB: '/v1/recruiter/job/delete/:jobId',
    GET_RECENT_JOBS: '/recruiter/recent/jobs',
  },
  RECRUITER_JOB_APPLICATIONS_MANAGE: {
    GET_APPLICATIONS_BY_JOBID: '/v1/recruiter/job/:jobId/application/details',
    GET_APPLICATION_DETAILS_BY_APPLICATION_ID:
      '/v1/recruiter/job/application/:applicationId/details',
    UPDATE_APPLICANT_NOTE_BY_APPLICATION_ID: '/v1/recruiter/application/:applicationId',
    SCHEDULE_INTERVIEW: '/recruiter/schedule-interview/:candidateId/job/:jobId/',
    UPDATE_APPLICANT_STATUS: '/v1/recruiter/application/:applicationId/status',
  },

  RECRUITERS: {
    LOAD_ALL_RECRUITER_APPLICATIONS: '/v2/recruiter/applications',
    CHANGE_STATUS_UNDER_REVIEW: '/v2/recruiter/application/:id/status-under-review',
    REJECT_APPLICATION_BY_ID: '/v2/recruiter/application/:recruiterId',
    APPROVE_APPLICATION_BY_ID: '/v2/recruiter/application/approve/:recruiterId',
    LOAD_ALL_RECRUITERS: '/v2/recruiters/data',
    LOAD_RECRUITER_DETAILS_BY_ID: '/v2/recruiters/:recruiterId',
    BLOCK_RECRUITER_BY_ID: '/recruiter/block/:companyId',
    HANDLE_RECRUITER_VERIFICATION: '/v2/recruiter/:recruiterId/verification/action',
    HANDLE_RECRUITER_PERMISSIONS: '/v2/recruiter/:recruiterId/permissions/update',
  },
} as const;
