import CandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import IUserRepository from "../../../domain/interfaces/IUserRepo.refactored";

export default class CheckCandidateBlockStatusUseCase {
    constructor(private _candidateRepo : CandidateRepo, private _userRepo : IUserRepository){}

    async execute(id : string) : Promise<boolean | null> {
        const isBlocked = await this._userRepo.isUserBlocked(id)
        return isBlocked
    }
}