import CandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import CandidateAggregatedDTO from "../../DTOs/candidate/candidateAggregatedDTO";
import CandidateDTO from "../../DTOs/candidate/candidateDTO";
import mapToCandidateAggDTO from "../../mappers/candidate/mapToCandidateAggDTO";
import ILoadCandidateDetailsUseCase from "./interfaces/ILoadCandidateDetailsUseCase";

export class LoadCandidateDetailsUseCase implements ILoadCandidateDetailsUseCase {
    constructor(private _candidateRepo : CandidateRepo){}

    async execute(id : string) : Promise<CandidateAggregatedDTO | null> {
        const candidate = await this._candidateRepo.candidateAggregatedData(id)
        if(candidate){
            const dto = mapToCandidateAggDTO(candidate)
            return dto
        }
        
        return null
    }
}