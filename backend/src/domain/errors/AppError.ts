export default class AppError extends Error {
  name: string;
  errorMessage: string;
  constructor(name: string, message: string) {
    super(message);
    this.name = name;
    this.errorMessage = message;
  }
}

export class DuplicateMobileError extends AppError {
  constructor() {
    super(
      'DUPLICATE_MOBILE',
      'Can not save a mobile number which is already linked with another user'
    );
  }
}

export class DuplicateEmailError extends AppError {
  constructor() {
    super('DUPLICATE_EMAIL', 'Can not save an email which is already linked with another user');
  }
}

export class InvalidUserError extends AppError {
  constructor() {
    super('INVALID_USER', 'Invalid user : No user data available o');
  }
}

export class OtpExpiredError extends AppError {
  constructor() {
    super('OTP_EXPIRED', 'Verification OTP has expired');
  }
}

export class WrongCredentialsError extends AppError {
  constructor() {
    super('WRONG_CREDENTIALS', 'Entered credentials are not matching with resource data');
  }
}

export class WrongPasswordError extends AppError {
  constructor() {
    super('WRONG_PASSWORD', 'Password not matching');
  }
}

export class BlockedEntityError extends AppError {
  constructor() {
    super('BLOCKED_ENTITY', 'Entity status is currently blocked');
  }
}

export class InvalidGoogleTokenError extends AppError {
  constructor() {
    super('INVALID_GOOGLE_TOKEN', 'Google Token is not valid');
  }
}

export class UserAlreadyVerifiedError extends AppError {
  constructor() {
    super('USER_ALREADY_VERIFIED', 'User is already verified');
  }
}

export class ValidationError extends AppError {
  constructor() {
    super('BAD_REQUEST', 'User request data does not pass the validation');
  }
}

export class ResourceAlreadyExistError extends AppError {
  constructor(resource: string) {
    super('RESOURCE_ALREADY_EXIST', `Duplicate: ${resource} already exist`);
  }
}

export class UserBlockedError extends AppError {
  constructor() {
    super(
      'USER_SUSPENDED',
      'Your Account has been temporarly blocked, check email for further information'
    );
  }
}

export class UserBannedError extends AppError {
  constructor() {
    super(
      'USER_BANNED',
      'Your account has ben banned due to violation of our community guidelines. Check email for further information'
    );
  }
}

export class ServiceBusyError extends AppError {
  constructor(service: string) {
    super('SERVICE_BUISY', `All of the ${service} are busy now, please try after some time`);
  }
}
