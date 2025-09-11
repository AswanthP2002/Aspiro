import FavoriteJobs from "../../entities/candidate/favoriteJobs";

import IBaseRepo from "../IBaseRepo";

export default interface IFavoriteJobsRepo extends IBaseRepo<FavoriteJobs> {
    getFavoriteJobWithDetails(candidateId : string) : Promise<FavoriteJobs[] | null>
    deleteFavoriteJob(jobId : string, candidateId : string) : Promise<void>
    findWithCandidateId(id : string) : Promise<FavoriteJobs[] | null>
}