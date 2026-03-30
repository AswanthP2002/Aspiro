import { NextFunction, Request, Response } from 'express';
import IGoogleLoginUseCase from '../../application/interfaces/usecases/user/IGoogleLogin.usecase';
import { StatusCodes } from '../statusCodes';
import { inject, injectable } from 'tsyringe';
import { StatusMessage } from '../../constants/Messages/statusMessages';

@injectable()
export default class OAuthController {
  constructor(@inject('IGoogleLoginUsecase') private _googleLoginUsecase: IGoogleLoginUseCase) {}

  async googleLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._googleLoginUsecase.execute(req.body?.googleToken);

      const { refreshToken } = result;
      res
        .status(StatusCodes.ACCEPTED)
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: 'lax',
          maxAge: parseInt(process.env.COOKIE_MAX_AGE as string),
        })
        .json({ success: true, message: StatusMessage.AUTH_MESSAGE.LOGIN, result });
    } catch (error: unknown) {
      next(error);
    }
  }
}
