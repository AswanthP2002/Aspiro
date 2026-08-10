import LoadRecruiterApplicationDTO from '../../../DTOs/recruiter/loadRecruiterApplication.dto';
import { AdminRecruiterApplicationsDTO } from '../../../DTOs/recruiter/recruiterProfileOverviewData.dto';

export default interface IGetRecruiterApplicationsUsecase {
  execute(
    loadRecruiterApplicationsDto: LoadRecruiterApplicationDTO
  ): Promise<{ applications: AdminRecruiterApplicationsDTO[]; totalPages: number } | null>;
}
