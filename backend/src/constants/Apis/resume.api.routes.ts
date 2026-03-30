export const ResumeApiRoutes = {
  RESUMES: {
    LOAD: '/v2/resumes/load',
    ADD: '/v2/resume/add',
    SET_RESUME_AS_PRIMARY: '/v2/resume/:resumeId/set-primary',
    DELETE: '/v2/resume/:resumeId/delete',
    ANALYZE_RESUME: '/v2/resume/analyze',
    ANALYZE_RESUME_DETAILED: '/v2/resume/analyze/detailed',
  },
} as const;
