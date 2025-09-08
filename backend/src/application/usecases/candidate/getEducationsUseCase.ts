import Education from "../../../domain/entities/candidate/educations";
import IEducationRepo from "../../../domain/interfaces/candidate/IEducationRepo";
import { EducationDTO } from "../../DTOs/candidate/educationDTO";
import mapToEducationDTOFromEducation from "../../mappers/candidate/mapToEducationDTOFromEducation";
import ILoadEducationsUseCase from "./interface/ILoadEducationsUseCase";

export default class GetEducationsUseCase implements ILoadEducationsUseCase {
    constructor(private _iEducationRepo : IEducationRepo){}

    async execute(candidateId : string) : Promise<EducationDTO[] | null> {
        const result = await this._iEducationRepo.findWithCandidateId(candidateId)
        if(result){
            const dto : EducationDTO[] = []
            result.forEach((education : Education) => {
                dto.push(mapToEducationDTOFromEducation(education))
            })
            return dto
        }
        return null
    }
}