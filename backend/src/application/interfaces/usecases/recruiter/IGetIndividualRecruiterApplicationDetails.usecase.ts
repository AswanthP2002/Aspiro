import { AdminRecruiterApplicationDetailsDTO } from '../../../DTOs/recruiter/recruiterProfileOverviewData.dto.FIX';

export default interface IGetIndividualRecruiterApplicationDetailsUsecase {
  execute(recruiterAppId: string): Promise<AdminRecruiterApplicationDetailsDTO | null>;
}
