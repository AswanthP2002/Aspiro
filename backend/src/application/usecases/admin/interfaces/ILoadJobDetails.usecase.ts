import JobAggregatedDTO from "../../../DTOs/job/jobDetails.dto.FIX";

export default interface ILoadJobDetailsUseCase {
    execute(id : string) : Promise<JobAggregatedDTO | null>
}