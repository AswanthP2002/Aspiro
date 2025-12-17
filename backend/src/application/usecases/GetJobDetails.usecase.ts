import { inject, injectable } from "tsyringe";
import IJobRepo from "../../domain/interfaces/IJobRepo";
import mapJobAggregatedToJobDetailsDTO from "../../domain/mappers/mapJobAggToJobDetailsDTO";
import JobAggregatedDTO from "../DTOs/jobDetails.dto";
import IGetJobDetailsUseCase from "./interfaces/IGetJobDetails.usecase";

@injectable()
export default class GetJobDetailsUseCase implements IGetJobDetailsUseCase {
    constructor(
        @inject('IJobRepository') private _repo: IJobRepo
    ) {}

    async execute(jobId: string): Promise<JobAggregatedDTO | null> {
        const result = await this._repo.getJobDetails(jobId)
        if(result){
            const dto = mapJobAggregatedToJobDetailsDTO(result)
            return dto
        }

        return null
    }
}