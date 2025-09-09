import Candidate from "../../../domain/entities/candidate/candidates";
import CandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import CandidateDTO from "../../DTOs/candidate/candidateDTO";
import mapToCandidateDTO from "../../mappers/candidate/mapToCandidateDto";
import ILoadCandidatePersonalDataUseCase from "./interface/ILoadCandidatePersonalDataUseCase";

export class LoadCandidatePersonalDataUC implements ILoadCandidatePersonalDataUseCase {
    constructor(private cRepo : CandidateRepo){}

    async execute(id : string) : Promise<CandidateDTO | null>{
        const candidateDetails = await this.cRepo.findById(id)

        if(candidateDetails){
            const dto = mapToCandidateDTO(candidateDetails)
            return dto
        }
        return null
    }
}