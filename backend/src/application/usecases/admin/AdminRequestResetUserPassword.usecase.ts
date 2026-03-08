import { inject, injectable } from 'tsyringe';
import IAdminRequestResetUserPasswordUsecase from '../../interfaces/usecases/admin/IAdminRequestRestPassword.usecase';
import IEmailService from '../../interfaces/services/IEmailService';
import { generateCode } from '../../../utilities/generateCode';
import { generateOtherSecurityToken } from '../../../services/jwt';

@injectable()
export default class AdminRequestResetUserPasswordUsecase implements IAdminRequestResetUserPasswordUsecase {
  constructor(@inject('IEmailService') private _emailService: IEmailService) {}

  async execute(id: string, email: string): Promise<{ token: string } | null> {
    const code = generateCode();
    const subject = 'User password reset request';
    console.log('code for reset', code);
    const token = await generateOtherSecurityToken({ id, code });
    return { token };
  }
}
