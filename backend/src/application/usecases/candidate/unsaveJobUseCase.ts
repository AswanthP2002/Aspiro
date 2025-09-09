import IFavoriteJobsRepo from "../../../domain/interfaces/candidate/IFavoriteJobRepo";
import IUnsaveJobUseCase from "./interface/IUnsaveJobUseCase";

export default class UnsaveJobUseCase implements IUnsaveJobUseCase {
    constructor(private _iFavoriteJobRepo : IFavoriteJobsRepo){}

    async execute(jobId: string, candidateId: string): Promise<void> {
        console.log('Job unsaving request reached here', )
        console.log('job id', jobId)
        console.log('candidate id', candidateId)
        await this._iFavoriteJobRepo.deleteFavoriteJob(jobId, candidateId)
    }
}



