import { RecruiterDTO } from '../../../DTOs/recruiter/recruiter.dto';

export default interface IBulckApproveRecruiterApplicationUsecase {
  execute(): Promise<RecruiterDTO[] | null>;
}
