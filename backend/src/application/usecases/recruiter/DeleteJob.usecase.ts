import { inject, injectable } from "tsyringe";
import IDeleteJobUsecase from "../../interfaces/usecases/recruiter/IDeleteJob.usecase";
import IJobRepo from "../../../domain/interfaces/IJobRepo";

@injectable()
export default class DeleteJobUsecase implements IDeleteJobUsecase {
    constructor(@inject('IJobRepository') private _jobRepo: IJobRepo) {}

    async execute(jobId: string): Promise<void> {
        await this._jobRepo.delete(jobId)
    }
}