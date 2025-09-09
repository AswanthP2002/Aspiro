import Candidate from "../../../domain/entities/candidate/candidates";
import CandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import CandidateDTO, { EditCandidateDTO } from "../../DTOs/candidate/candidateDTO";
import mapToCandidateDTO from "../../mappers/candidate/mapToCandidateDto";
import IEditProfileUseCase from "./interface/IEditProfileUseCase";

export default class EditProfileUseCase implements IEditProfileUseCase {
    constructor(private _iCandidateRepo : CandidateRepo){}

    async execute(editCandidateDto: EditCandidateDTO): Promise<CandidateDTO | null> {
        const {id, name, city, district, state, country, role, about} = editCandidateDto
        const result = await this._iCandidateRepo.editProfile(id, name, role, city, district, state, country, about)
        if(result){
            const dto = mapToCandidateDTO(result)
            return dto
        }
        return null
    }
}