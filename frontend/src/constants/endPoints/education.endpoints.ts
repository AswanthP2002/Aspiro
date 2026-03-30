export const EducationEndpoints = {
    ADD_EDUCATION: '/v2/education/add',
    LOAD_ALL_EDUCATIONS: '/v2/educations/load',
    UPDATE_EDUCATION_BY_EDUCATIONID: (educationId: string) => `/v2/education/${educationId}`,
    DELETE_EDUCATION_BY_EDUCATIONID: (educationId: string) => `/v2/education/${educationId}/delete`
} as const