export const StatusMessage = {
  EXPERIENCE: {
    ADD_SUCCESS: 'Experience added succesfully',
    FETCH_SUCCESS: 'Experiences fetched succesfully',
    UPDATE_SUCCESS: 'Experience updated succesfully',
    DELETE_SUCCESS: 'Experience deleted',
  },
  EDUCATION: {
    ADD_SUCCESS: 'Education added succesfully',
    FETCH_SUCCESS: 'Educations fetched succesfully',
    UPDATE_SUCCESS: 'Education updated succesfully',
    DELETE_SUCCESS: 'Education deleted succesfully',
  },
  SKILL: {
    ADD_SUCCESS: 'Skill added succesfully',
    FETCH_SUCCESS: 'Skills fetched succesfully',
    DELETE_SUCCESS: 'Skill deleted succesfully',
  },
  CERTIFICATE: {
    ADD_SUCCESS: 'Certificate added succesfully',
    FETCH_SUCCESS: 'Certificates fetched succesfully',
    DELETE_SUCCESS: 'Certificate deleted succesfully',
  },
  RESOURCE_MESSAGES: {
    RESOURCE_ADD: (resource: string) => `${resource} added succesfully`,
    RESOURCE_FETCH: (resource: string) => `${resource} fetched succesfully`,
    RESOURCE_EDIT: (resource: string) => `${resource} updated succesfully`,
    RESOURCE_DELETE: (resource: string) => `${resource} deleted succesfully`,
    RESOURCE_EXIST: (resource: string) => `${resource} already exist`,
    RESOURCE_NOT_FOUND: (resource: string) => `${resource} Not Found`,
    RESOURCE_CREATION_FAILED: (resource: string) => `${resource} can not created`,
  },
  COMMON_MESSAGE: {
    INTERNA_SERVER_ERROR: 'Internal server error, please try again after some time',
    SESSION_EXPIRED: 'Your session has been expired please login after some time',
    SOMETHING_WENT_WRONG: 'Something went wrong, please try again after some time',
  },
  AUTH_MESSAGE: {
    LOGIN: (auth: string) => `${auth} loged in succesfully`,
    NO_REFRESH_TOKEN: 'Your session has expired, please relogin to continue',
    INVALID_TOKEN: 'Invalid token',
    LOGOUT: 'User loged out succesfully',
    PASSWORD_RESET_LINK_SEND: 'Password reset link send succesfully',
    PASSWORD_RESET_SUCCESS: 'Password rest succesfully',
    PASSWORD_RESET_REQUEST: 'Requested for a password reset',
    CODE_VERIFICATION_FAILED: 'Code verification failed',
  },
} as const;
