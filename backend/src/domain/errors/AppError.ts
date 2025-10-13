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
  constructor(){
    super('WRONG_PASSWORD', 'Password not matching')
  }
}

export class BlockedEntityError extends AppError {
  constructor() {
    super('BLOCKED_ENTITY', 'Entity status is currently blocked');
  }
}

export class InvalidGoogleTokenError extends AppError {
  constructor() {
    super('INVALID_GOOGLE_TOKEN', 'Google Token is not valid')
  }
}
