import RecruiterProfilelOverviewDataDTO from "../../../DTOs/recruiter/recruiterProfileOverviewData.dto.FIX";

export default interface ILoadRecruiterProfileOverviewUsecase {
  execute(recruiterId: string): Promise<RecruiterProfilelOverviewDataDTO | null>;
}
