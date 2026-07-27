export const JobsEndpoints = {
    FETCH_JOBS: '/v1/jobs',
    FETCH_JOB_DETAILS_BY_ID: (jobId: string) => `/v1/jobs/details/${jobId}`,
    LOAD_RECOMMENDED_JOBS: '/v1/jobs/recommended',
    FETCH_JOB_HOME_PAGE: '/v1/home/jobs',

    RECRUITER: {
        EDIT_JOB: '/recruiter/job/edit',
        GET_RECENT_JOBS: '/recruiter/recent/jobs'
    }
} as const