import RecruiterProfilelOverviewDataDTO from "../../../DTOs/recruiter/recruiterProfileOverviewData.dto";

export default interface ILoadRecruiterProfileOverviewUsecase {
  execute(recruiterId: string): Promise<RecruiterProfilelOverviewDataDTO | null>;
}
