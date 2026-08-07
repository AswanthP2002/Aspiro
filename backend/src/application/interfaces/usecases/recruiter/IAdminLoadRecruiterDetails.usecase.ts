import { AdminRecruiterDetailsDTO } from '../../../DTOs/recruiter/recruiterProfileOverviewData.dto';

export default interface IAdminLoadRecruiterDetailsUsecase {
  execute(recruiterId: string): Promise<AdminRecruiterDetailsDTO | null>;
}
