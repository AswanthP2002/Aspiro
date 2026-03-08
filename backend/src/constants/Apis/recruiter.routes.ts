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
    EDIT_A_JOB: '/recruiter/job/edit',
    DELETE_A_JOB: '/recruiter/job/delete/:jobId',
    GET_RECENT_JOBS: '/recruiter/recent/jobs'
  },
  RECRUITER_JOB_APPLICATIONS_MANAGE: {
    GET_APPLICATIONS_BY_JOBID: '/v1/recruiter/job/:jobId/application/details',
    GET_APPLICATION_DETAILS_BY_APPLICATION_ID:
      '/v1/recruiter/job/application/:applicationId/details',
    UPDATE_APPLICANT_NOTE_BY_APPLICATION_ID: '/v1/recruiter/application/:applicationId',
    SCHEDULE_INTERVIEW: '/recruiter/schedule-interview/:candidateId/job/:jobId/',
    UPDATE_APPLICANT_STATUS: '/recruiter/application/:applicationId/status'
  },
} as const;
