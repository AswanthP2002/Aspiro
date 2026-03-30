export const JobsEndpoints = {
    FETCH_JOBS: '/v1/jobs',
    FETCH_JOB_DETAILS_BY_ID: (jobId: string) => `/v1/jobs/details/${jobId}`,
    LOAD_RECOMMENDED_JOBS: '/v1/jobs/recommended'
} as const