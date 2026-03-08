export const AdminEndPoints = {
    ADMIN_LOGIN: '/admin/v1/login',
    LOAD_USERS: '/admin/v1/users',
    LOAD_USER_DETAILS: (userId: string) => `/admin/v1/users/details/${userId}`,
    BLOCK_USER: (userId: string) => `/admin/v1/user/block/${userId}`,
    UNBLOCK_USER: (userId: string) => `/admin/v1/user/unblock/${userId}`,
    BAN_USER: (userId: string) => `/admin/v1/user/ban/${userId}`,
    DELETE_USER: (userId: string) => `/admin/v1/user/${userId}`,
    REQUEST_PASSWORD_RESET: '/admin/v1/password/reset-request',
    RESET_USER_PASSWORD: `/admin/v1/user/password-reset`,
    LOAD_RECRUITER_APPLICATIONS: `/admin/v1/recruiter/applications`,
    REJECT_RECRUITER_APPLICATION: (recruiterId: string) => `/admin/v1/recruiter/application/${recruiterId}`,
    APPROVE_RECRUITER_APPLICATION: (recruiterId: string) => `/admin/v1/recruiter/application/approve/${recruiterId}`,
    ADMIN_LOAD_RECRUITERS: `/admin/v1/recruiters/data`,
    ADMIN_RECRUITER_DETAILS: (recruiterId: string) => `/admin/v1/recruiters/${recruiterId}`,
    ADMIN_REVOKE_RECRUITER_VERIFICATION: (recruiterId: string) => `/admin/v1/recruiter/${recruiterId}/verification/action`,
    ADMIN_REVOKE_RECRUITER_PERMISSIONS: (recruiterId: string) => `/admin/v1/recruiter/${recruiterId}/permissions/update`,

    //Configs - Work Mode
    ADMIN_ADD_WORKMODE: `/admin/v1/workmode`,
    ADMIN_GET_WORKMODES: `/admin/v1/workmodes`,
    ADMIN_CHANGE_WORKMODE_STATUS: (workModeId: string) => `/admin/v1/workmodes/${workModeId}/status`,
    ADMIN_DELETE_WORKMODE: (workModeId: string) => `/admin/v1/workmodes/${workModeId}`,
    ADMIN_EDIT_WORKMODE: (workmodeId: string) => `/admin/v1/workmodes/${workmodeId}/edit`,

    //configs - Job Level
    ADMIN_ADD_JOBLEVEL: `/admin/v1/joblevel`,
    ADMIN_GET_JOBLEVELS: `/admin/v1/joblevels`,
    ADMIN_EDIT_JOBLEVEL: (id: string) => `/admin/v1/joblevel/${id}/update`,
    ADMIN_CHANGE_JOBLEVEL_STATUS: (id: string) => `/admin/v1/joblevel/${id}/status`,
    ADMIN_DELETE_JOBLEVEL: (id: string) => `/admin/v1/joblevel/${id}`,

    //configs - Skills
    ADMIN_ADD_SKILL: `/admin/v1/skill`,
    ADMIN_UPDATE_SKILL:(skillId: string) => `/admin/v1/skills/${skillId}`,
    ADMIN_GET_SKILLS: `/admin/v1/skills`,
    ADMIN_DELETE_SKILLS: (skillId: string) => `/admin/V1/skills/${skillId}`,

    //Recruiter - application - manage
    ADMIN_RECRUITER_APPLICATION_STATUS_UNDER_REVIEW: (id: string) => `/admin/v1/recruiter/application/${id}/status-under-review`,

    //Jobs - manage
    ADMIN_JOBS_LOAD_ALL_JOBS: '/admin/v1/jobs/data',
    ADMIN_JOB_DETAILS_BY_ID: (jobId: string) => `/admin/v1/job/details/${jobId}`,
    ADMIN_DELETE_JOB_BY_ID: (jobId: string) => `/admin/v1/job/${jobId}`
} as const