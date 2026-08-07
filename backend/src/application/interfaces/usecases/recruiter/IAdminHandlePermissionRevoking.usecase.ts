import { RecruiterDTO } from '../../../DTOs/recruiter/recruiter.dto';

export default interface IAdminHandlePermissionRevokingUsecase {
  execute(recruiterId: string, action: 'Revoke' | 'Un-Revoke'): Promise<RecruiterDTO | null>;
}
