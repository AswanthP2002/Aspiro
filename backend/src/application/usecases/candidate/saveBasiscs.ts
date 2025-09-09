import CandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import { CandidateDetails } from "../../../presentation/controllers/dtos/candidate/userDetailsDTO";
import CandidateDTO from "../../DTOs/candidate/candidateDTO";
import { SaveIntroDetailsInpDTO } from "../../DTOs/candidate/saveIntroDetailsDTO";
import mapToCandidateDTO from "../../mappers/candidate/mapToCandidateDto";
import ISaveIntroDetailsUseCase from "./interface/ISaveIntroDetailsUseCase";

export default class SaveIntroDetailsUseCase implements ISaveIntroDetailsUseCase {
    constructor(private candidateRepo : CandidateRepo){}

    async execute(saveIntroDetailsInpDto : SaveIntroDetailsInpDTO) : Promise<CandidateDTO>{
        const {id, city, district, state, country, pincode, role, summary} = saveIntroDetailsInpDto
        const updatedCandidate = await this.candidateRepo.updateIntroDetails(id, role, city, district, state, country, pincode, summary)
        if(!updatedCandidate) throw new Error("Candidate Not Updated")
        const dto = mapToCandidateDTO(updatedCandidate)
        return dto
    }
}