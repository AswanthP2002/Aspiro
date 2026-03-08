import RejectRecruiterApplicationDTO from '../../../DTOs/admin/rejectRecruiter.dto.FIX';
import { RecruiterDTO } from '../../../DTOs/recruiter/recruiter.dto.FIX';

export default interface IRejectRecruiterApplication {
  execute(
    rejectRecruiterApplicationDto: RejectRecruiterApplicationDTO
  ): Promise<RecruiterDTO | null>;
}
