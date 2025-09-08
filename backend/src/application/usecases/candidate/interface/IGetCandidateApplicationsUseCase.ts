import JobApplicationAggregatedDTO from "../../../DTOs/candidate/jobApplicationAggregatedDTO";

export default interface IGetCandidateApplicationsUseCase {
    execute(candidateId : string) : Promise<JobApplicationAggregatedDTO[] | null>
}