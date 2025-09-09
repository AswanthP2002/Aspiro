import Education from "../../../domain/entities/candidate/educations";
import IEducationRepo from "../../../domain/interfaces/candidate/IEducationRepo";
import { EducationDTO, UpdateEducationDTO } from "../../DTOs/candidate/educationDTO";
import mapToEducationDTOFromEducation from "../../mappers/candidate/mapToEducationDTOFromEducation";
import mapToEducationFromUpdateEducationDTO from "../../mappers/candidate/mapToEducationFromUpdateEducationDTO";
import IEditEducationUseCase from "./interface/IEditEducationUseCase";

export default class EditEducationUseCase implements IEditEducationUseCase {
    constructor(private _iEducationRepo : IEducationRepo) {}

    async execute(updateEducationDto: UpdateEducationDTO): Promise<EducationDTO | null> {
        const updateEducation = mapToEducationFromUpdateEducationDTO(updateEducationDto)
        const result = await this._iEducationRepo.editEducation(updateEducation)
        if(result){
            const dto = mapToEducationDTOFromEducation(result)
            return dto
        }
        return null
    }
}