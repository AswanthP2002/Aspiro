import { RecruiterDTO } from '../../../DTOs/recruiter/recruiter.dto.FIX';

export default interface IAdminHandlePermissionRevokingUsecase {
  execute(recruiterId: string, action: 'Revoke' | 'Un-Revoke'): Promise<RecruiterDTO | null>;
}
