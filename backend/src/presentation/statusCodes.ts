export enum StatusCodes {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDEN = 403,
  NOT_FOUND = 404,
  NOT_ACCEPTABLE = 406,
  CONFLICT = 409,
  TOO_MANY_REQUESTS = 429,
  LOGIN_TIMEOUT_NON_STANDARD = 440,//This one is not a standard http status code :: Microsoft
  INTERNAL_SERVER_ERROR = 500, 
}
