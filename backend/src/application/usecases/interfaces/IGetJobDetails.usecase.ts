import JobAggregatedDTO from "../../DTOs/jobDetails.dto";

export default interface IGetJobDetailsUseCase {
    execute(jobId : string) : Promise<JobAggregatedDTO | null>
}