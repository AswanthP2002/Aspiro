export const RecruiterEndPoints = {
    REGISTER_RECRUITER: '/v1/recruiter/create',
    RECRUITER_DASHBOARD: '/v1/recruiter/profile/overview',
    ADD_COMPANY: '/v1/company',
    FETCH_COMPANY_LIST: '/v1/companies/list',
    FETCH_JOBLEVEL_LIST: '/v1/recruiter/joblevels',
    FETCH_JOBTYPE_LIST: '/v1/recruiter/jobtypes',
    FETCH_WORKMODE_LIST: '/v1/recruiter/workmodes',
    POST_A_JOB: '/recruiter/job/create',
    GET_MY_JOBS: '/recruiter/jobs',
    GET_JOB_APPLICATIONS_BY_ID: (jobId: string) => `/v1/recruiter/job/${jobId}/application/details`,
    GET_JOB_APPLICATION_DETAILS_BY_APPLICATION_ID: (applicationId: string) => `/v1/recruiter/job/application/${applicationId}/details`,
    UPDATE_CANDIDATE_NOTE: (applicationId: string) => `/v1/recruiter/application/${applicationId}`
} as const