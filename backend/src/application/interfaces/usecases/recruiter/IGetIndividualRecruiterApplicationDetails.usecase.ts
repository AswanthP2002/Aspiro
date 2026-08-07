import { AdminRecruiterApplicationDetailsDTO } from '../../../DTOs/recruiter/recruiterProfileOverviewData.dto';

export default interface IGetIndividualRecruiterApplicationDetailsUsecase {
  execute(recruiterAppId: string): Promise<AdminRecruiterApplicationDetailsDTO | null>;
}
