import JobAggregatedDTO from "../../../DTOs/jobDetails.dto";

export default interface ILoadJobDetailsUseCase {
    execute(id : string) : Promise<JobAggregatedDTO | null>
}