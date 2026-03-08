import { RecruiterDTO } from '../../../DTOs/recruiter/recruiter.dto.FIX';

export default interface IAdminRevokeRecruiterVerification {
  execute(recruiterId: string, action: 'Verified' | 'Revoked'): Promise<RecruiterDTO | null>;
}
