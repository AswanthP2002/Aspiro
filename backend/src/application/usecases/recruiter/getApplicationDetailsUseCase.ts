import JobApplication from "../../../domain/entities/candidate/jobApplication";
import IJobApplicationRepo from "../../../domain/interfaces/IJobApplicationRepo";

export default class GetJobApplicationDetailsUseCase {
    constructor(private _iJobApplicationRepo : IJobApplicationRepo) {}

    async execute(jobId : string) : Promise<JobApplication[] | any> {
        const result = await this._iJobApplicationRepo.getApplicationsByJobId(jobId)
        return result
    }
}