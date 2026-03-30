import GoogleTokenVerificationDTO from '../../DTOs/user/googleTokenVerification.dto';

export default interface IGoogleAuthService {
  verify(token: string): Promise<GoogleTokenVerificationDTO>;
}
