import LoadRecruiterApplicationDTO from "../../../DTOs/admin/loadRecruiterApplication.dto";
import RecruiterProfilelOverviewDataDTO from "../../../DTOs/recruiter/recruiterProfileOverviewData.dto";

export default interface IGetRecruiterApplicationsUsecase {
    execute(loadRecruiterApplicationsDto: LoadRecruiterApplicationDTO): Promise<RecruiterProfilelOverviewDataDTO[] | null>
}