import FavoriteJobs from "../../../domain/entities/candidate/favoriteJobs";
import IFavoriteJobsRepo from "../../../domain/interfaces/candidate/IFavoriteJobRepo";
import ICheckIsJobSavedUseCase from "./interface/ICheckIsJobSavedUseCase";

export default class CheckIsJobSavedUseCase implements ICheckIsJobSavedUseCase {
    constructor(private _favoritejobRepo : IFavoriteJobsRepo){}

    async execute(jobId: string, candidateid : string): Promise<boolean | null> {
        const favoriteJobs = await this._favoritejobRepo.findWithCandidateId(candidateid)
    
        if(favoriteJobs){
            const jobFound = favoriteJobs.find((job : FavoriteJobs) => {
                if(job.jobId?.toString().includes(jobId.toString())){
                    return job
                }
            }) || {}

            return Object.entries(jobFound).length > 0
        }

        return null
    }
}