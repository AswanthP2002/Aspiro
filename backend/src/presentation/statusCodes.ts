export enum StatusCodes {
    OK = 200,
    ACCEPTED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDEN = 403,
    NOT_FOUND = 404,
    NOT_ACCEPTABLE = 406,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500,
    LOGIN_TIMEOUT_NON_STANDARD = 440 //This one is not a standard http status code :: Microsoft
}