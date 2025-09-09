import IExperienceRepo from "../../../domain/interfaces/candidate/IExperienceRepo";
import Experience from "../../../domain/entities/candidate/experience";
import mongoose from "mongoose";
import { ExperienceDTO, ExperienceSchema } from "../../../presentation/controllers/dtos/candidate/experienceDTO";
import createExperienceFromExperienceDTO from "../../../domain/mappers/candidate/experienceMapper";
import IAddExperience from "./interface/IAddExperienceUseCase";
import CreateExperienceDTO from "../../DTOs/candidate/experienceDTO";
import mapToExperience from "../../mappers/candidate/mapToExperience";
import mapToExperienceDTO from "../../mappers/candidate/mapToExperienceDTO";

export default class AddExperienceUseCase implements IAddExperience{
    constructor(private _experienceRepo : IExperienceRepo){}

    async execute(createExperienceDto : CreateExperienceDTO) : Promise<ExperienceDTO | null> {
        const newExperience = mapToExperience(createExperienceDto)
        
        const result = await this._experienceRepo.create(newExperience)
        if(result){
            const dto = mapToExperienceDTO(result)
            return dto
        }

        return null
    }
}