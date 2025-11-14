import GoogleTokenVerificationDTO from '../../application/DTOs/googleTokenVerification.dto';
import { OAuth2Client } from 'google-auth-library';
import { InvalidGoogleTokenError } from '../../domain/errors/AppError';
import IGoogleAuthService from '../../application/interfaces/services/IGoogleAuthService';

const googleClientId = process.env.GOOGLE_CLIENT_ID;

export default class GoogleAuthService implements IGoogleAuthService {
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
      email: payload.email as string,
      name: payload.name as string,
    };
  }
}
