import { NextFunction, Request, Response } from 'express';
import IGoogleLoginUseCase from '../../application/usecases/interfaces/IGoogleLogin.usecase';
import { StatusCodes } from '../statusCodes';

export default class OAuthController {
  constructor(private _googleLoginUseCase: IGoogleLoginUseCase) {}

  async googleLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result: any = await this._googleLoginUseCase.execute(req.body?.googleToken);
      const { refreshToken } = result;
      res
        .status(StatusCodes.ACCEPTED)
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: 'lax',
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({ success: true, message: 'Login successful', result });
    } catch (error: unknown) {
      next(error);
    }
  }
}
