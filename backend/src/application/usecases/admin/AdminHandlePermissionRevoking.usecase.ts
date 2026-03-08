import { injectable, inject } from 'tsyringe';
import IAdminHandlePermissionRevokingUsecase from '../../interfaces/usecases/admin/IAdminHandlePermissionRevoking.usecase';
import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import { RecruiterDTO } from '../../DTOs/recruiter/recruiter.dto.FIX';

@injectable()
export default class AdminHandlePermissionRevoking implements IAdminHandlePermissionRevokingUsecase {
  constructor(@inject('IRecruiterRepository') private _repo: IRecruiterRepo) {}

  async execute(recruiterId: string, action: 'Revoke' | 'Un-Revoke'): Promise<RecruiterDTO | null> {
    if (action === 'Revoke') {
      const result = await this._repo.update(recruiterId, { isPermissionRevoked: true });
      return result as RecruiterDTO;
    } else if (action === 'Un-Revoke') {
      const result = await this._repo.update(recruiterId, { isPermissionRevoked: false });
      return result as RecruiterDTO;
    }

    return null;
  }
}
