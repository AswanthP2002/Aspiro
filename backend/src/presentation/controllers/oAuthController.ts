import { NextFunction, Request, Response } from 'express';
import IGoogleLoginUseCase from '../../application/interfaces/usecases/user/IGoogleLogin.usecase';
import { StatusCodes } from '../statusCodes';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class OAuthController {
  constructor(@inject('IGoogleLoginUsecase') private _googleLoginUsecase: IGoogleLoginUseCase) {}

  async googleLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result: any = await this._googleLoginUsecase.execute(req.body?.googleToken);

      console.log('Checking result before sending response', result)
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
