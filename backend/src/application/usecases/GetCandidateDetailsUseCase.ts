import ICandidateRepo from "../../domain/interfaces/candidate/ICandidateRepo";
import CandidateAggregatedDTO from "../DTOs/candidate/candidateAggregatedDTO";
import mapToCandidateAggDTO from "../mappers/candidate/mapToCandidateAggDTO";
import IGetCandidateDetailsUseCase from "./interfaces/IGetCandiateDetailsUseCase";

export default class GetCandidateDetailsUseCase implements IGetCandidateDetailsUseCase {
    constructor(private _iCandidateRepo : ICandidateRepo) {}

    async execute(candidateId: string): Promise<CandidateAggregatedDTO | null> {
        const result = await this._iCandidateRepo.candidateAggregatedData(candidateId)
        if(result){
            const dto = mapToCandidateAggDTO(result)
            return dto
        }
        return null
    }
}