export enum UserRoutes {
    SOCIAL_FEED = '/feed',
    JOBS = '/jobs',
    JOB_DETAILS = '/jobs/:id',
    JOB_APPLY = '/jobs/:id/apply',
    USERS = '/users',
    USER_DETAILS = '/users/:userId',
    CHATS = '/chats',
    NOTIFICATIONS = '/notifications',
    USER_PROTECTED_ROUTE = '/profile',
    MY_PROFILE_PERSONAL = 'personal',
    MY_PROFILE_DOCUMENTS = 'documents',
    MY_EXPERIENCES_EDUCATIONS_SKILLS = 'skills-experience',
    VERIFY = '/verify',
    LOGIN = '/login',
    REGISTER = '/register',
    STORE_BASIC_DETAILS = '/store/details',
    APPLICATION_SUCCESS_PAGE = '/job/application/success-state',
    FAVORITE_JOBS = 'favorites',
    MY_APPLICATIONS = 'my-applications',
    MY_APPLICATION_TRACK = 'my-application/:id'

}