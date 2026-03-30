export const ExperienceEndPoints = {
    ADD_EXPERIENCE: '/v2/experience/add',
    GET_ALL_EXPERIENCE: '/v2/experiences/load',
    UPDATE_EXPERIENCE_BY_EXPERIENCEID:(experienceId: string) => `/v2/experience/${experienceId}`,
    DELETE_EXPERIENCE_BY_EXPERIENCEID: (experienceId: string) => `/v2/experience/${experienceId}/delete`
} as const