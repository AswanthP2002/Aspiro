import { RecruiterDTO } from '../../../DTOs/recruiter/recruiter.dto.FIX';

export default interface IBulckApproveRecruiterApplicationUsecase {
  execute(): Promise<RecruiterDTO[] | null>;
}
