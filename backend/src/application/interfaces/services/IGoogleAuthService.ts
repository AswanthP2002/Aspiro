import GoogleTokenVerificationDTO from '../../DTOs/googleTokenVerification.dto';

export default interface IGoogleAuthService {
  verify(token: string): Promise<GoogleTokenVerificationDTO>;
}

