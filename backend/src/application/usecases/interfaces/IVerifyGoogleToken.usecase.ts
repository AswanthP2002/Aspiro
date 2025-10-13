import GoogleTokenVerificationDTO from '../../DTOs/googleTokenVerification.dto';

export default interface IVerifyGoogleTokenUseCase {
  verify(token: string): Promise<GoogleTokenVerificationDTO>;
}

//stoped at google login interface //:: implementation left
