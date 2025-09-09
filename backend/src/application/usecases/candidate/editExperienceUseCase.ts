
import IExperienceRepo from "../../../domain/interfaces/candidate/IExperienceRepo";

import { EditExperienceDTO, ExperienceDTO } from "../../DTOs/candidate/experienceDTO";
import mapToEditExperienceFromDTO from "../../mappers/candidate/mapToEditExperienceFromDTO";

import mapToExperienceDTO from "../../mappers/candidate/mapToExperienceDTO";
import IEditExperienceUseCase from "./interface/IEditExperienceUseCase";

export default class EditExperienceUseCase implements IEditExperienceUseCase {
    constructor(private _experienceRepo : IExperienceRepo){}

    async execute(experienceId : string, editExperienceDto : EditExperienceDTO) : Promise<ExperienceDTO | null> {
        const editData = mapToEditExperienceFromDTO(editExperienceDto)
       // const editData = {...editExperienceDto}
        const result = await this._experienceRepo.editExperience(experienceId,  editData)
        if(result){
            const dto = mapToExperienceDTO(result)
            return dto
        }
        return null
    }
}