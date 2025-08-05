import JobApplication from "../../../domain/entities/candidate/jobApplication";
import IJobApplicationRepo from "../../../domain/interfaces/IJobApplicationRepo";
import IGetJobApplicationDetailsUseCase from "./interface/IGetJobApplicationDetailsUseCase";

export default class GetJobApplicationDetailsUseCase implements IGetJobApplicationDetailsUseCase {
    constructor(private _iJobApplicationRepo : IJobApplicationRepo) {}

    async execute(jobId : string) : Promise<JobApplication[] | any> {
        const result = await this._iJobApplicationRepo.getApplicationsByJobId(jobId)
        return result
    }
}