import LoadRecruiterApplicationDTO from '../../../DTOs/admin/loadRecruiterApplication.dto.FIX';
import RecruiterProfilelOverviewDataDTO from '../../../DTOs/recruiter/recruiterProfileOverviewData.dto.FIX';

export default interface IGetRecruiterApplicationsUsecase {
  execute(
    loadRecruiterApplicationsDto: LoadRecruiterApplicationDTO
  ): Promise<RecruiterProfilelOverviewDataDTO[] | null>;
}
