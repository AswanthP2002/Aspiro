import { injectable } from 'tsyringe';
import IValidateTokenUsecase from '../../interfaces/usecases/user/IValidateToken.usecase';
import { verifyToken } from '../../../services/jwt';

@injectable()
export default class ValidateTokenUsecase implements IValidateTokenUsecase {
  async execute(token: string): Promise<boolean | null> {
    try {
      const result = await verifyToken(token);
      return result ? true : false;
    } catch (error: unknown) {
      console.log('Error occured while validating token', error);
      throw error;
    }
  }
}
