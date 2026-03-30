import LoadRecruiterApplicationDTO from '../../../DTOs/recruiter/loadRecruiterApplication.dto.FIX';
import { AdminRecruiterApplicationsDTO } from '../../../DTOs/recruiter/recruiterProfileOverviewData.dto.FIX';

export default interface IGetRecruiterApplicationsUsecase {
  execute(
    loadRecruiterApplicationsDto: LoadRecruiterApplicationDTO
  ): Promise<{ applications: AdminRecruiterApplicationsDTO[]; totalPages: number } | null>;
}
