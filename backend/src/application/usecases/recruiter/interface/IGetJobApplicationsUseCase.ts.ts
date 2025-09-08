import ApplicationsAggregatedDTO from "../../../DTOs/recruiter/ApplicationAggDTO";

export default interface IGetJobApplicationsUseCase {
    execute(jobId : string) : Promise<ApplicationsAggregatedDTO[] | null>
}