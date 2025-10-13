import GoogleTokenVerificationDTO from '../../application/DTOs/googleTokenVerification.dto';
import IVerifyGoogleTokenUseCase from '../../application/usecases/interfaces/IVerifyGoogleToken.usecase';
import { OAuth2Client } from 'google-auth-library';
import { InvalidGoogleTokenError } from '../../domain/errors/AppError';

const googleClientId = process.env.GOOGLE_CLIENT_ID;

export default class GoogleAuthService implements IVerifyGoogleTokenUseCase {
  client: OAuth2Client;
  constructor() {
    this.client = new OAuth2Client(googleClientId);
  }
  async verify(token: string): Promise<GoogleTokenVerificationDTO> {
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: googleClientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw new InvalidGoogleTokenError();
    }

    return {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
    };
  }
}
