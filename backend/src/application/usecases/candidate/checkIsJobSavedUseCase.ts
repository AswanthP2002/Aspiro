import IFavoriteJobsRepo from "../../../domain/interfaces/candidate/IFavoriteJobRepo";
import ICheckIsJobSavedUseCase from "./interface/ICheckIsJobSavedUseCase";

export default class CheckIsJobSavedUseCase implements ICheckIsJobSavedUseCase {
    constructor(private _favoritejobRepo : IFavoriteJobsRepo){}

    async execute(jobId: string, candidateid : string): Promise<boolean | null> {
        const favoriteJobs = await this._favoritejobRepo.findWithCandidateId(candidateid)
        const jobFound = favoriteJobs?.find((doc) => {
            if(doc.jobId.toString().includes(jobId)) return doc
        }) || {}

        return Object.entries(jobFound).length > 0
    }
}